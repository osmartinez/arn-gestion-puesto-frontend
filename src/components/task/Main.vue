<template>
  <div class="task">
    <vue-tabs type="pills" centered active-text-color="white">
      <v-tab title="Tarea">
        <task-progress></task-progress>
      </v-tab>
      <v-tab title="Información tarea">
        <task-info></task-info>
      </v-tab>
      <v-tab title="Programación"> Programación </v-tab>
      <v-tab title="Estadísticas"> Estadísticas </v-tab>
      <v-tab title="Histórico acciones"> Histórico </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import TaskSelector from "./task/modals/TaskSelector";
import OrdenFabricacionOperacionService from "./../../services/api/OrdenFabricacionOperacionService";
import TareaNoSQLService from "./../../services/api/TareaNoSQLService";
import { startFromPrepaquete } from "../../services/task-services/task.procedures";
import GpioService from "../../services/backend/GpioService";

import TaskProgress from "./Task";
import TaskInfo from "./TaskInfo.vue";

export default {
  components: {
    TaskProgress,
    TaskInfo,
  },
  data() {
    return {
      selectedIndex: 0,
      hiloLectura: null,
      cadenaLectura: "",
      peticionPinsEnviada: false,
    };
  },
  mounted: async function () {
    if (this.$store.getters.hayPuesto) {
      this.$mqttPulso.callbacks[`/puesto/pulso`] = this.pulsoDetectado;
    }

    document.addEventListener("keyup", this.keyUp, false);
    if (this.$store.getters.hayPuesto) {
      const response3 = await TareaNoSQLService.getCurrentTask(
        this.$store.getters.puesto.Id
      );
      if (response3.data != null && response3.data._id) {
        this.$store.commit("setTask", response3.data);
      } else {
        this.$store.commit("removeTask");
      }
    }
  },

  beforeDestroy: function () {
    document.removeEventListener("keyup", this.keyUp);
  },
  methods: {
    async pulsoDetectado(msg) {
      if (!this.$store.getters.hayTarea) {
        this.$swal({
          icon: "error",
          title: "No hay tarea",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const obj = JSON.parse(msg);
        const maquina = this.$store.getters.puesto.Maquinas.find(
          (x) => x.ID === obj.maquinaId
        );
        const body = {
          IdPuesto: this.$store.getters.puesto.Id,
          IdMaquina: maquina.ID,
          EsPulsoManual: maquina.EsPulsoManual,
          ProductoPorPulso: maquina.ProductoPorPulso,
          PinPulso: maquina.PinPulso,
          DescontarAutomaticamente: maquina.DescontarAutomaticamente,
        };

        await GpioService.pulse(body);

        const pulse = {
          cantidad: maquina.ProductoPorPulso,
          fechaMovimiento: Date.now(),
        };

        let contador = 0;
        if (
          this.$store.getters.puesto.ContadorPaquetes ==
          this.$store.getters.contadorPaquetes
        ) {
          contador = maquina.ProductoPorPulso;
        } else {
          contador =
            this.$store.getters.contadorPaquetes + maquina.ProductoPorPulso;
          if (contador == this.$store.getters.puesto.ContadorPaquetes) {
            GpioService.packetCountReached(
              this.$store.getters.puesto.PinBuzzer
            );
          }
        }
        this.$store.commit("setCountPacket", contador);
        this.$store.commit("addPulseTask", pulse);
      }
    },
    async ficharPrepaquete(codigoEtiqueta) {
      try {
        const result = await startFromPrepaquete(codigoEtiqueta);
        this.$swal({
          icon: "success",
          title: result,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async ficharEtiquetaOperacion(codigoEtiqueta) {
      const resp = await OrdenFabricacionOperacionService.buscarPorId(
        Number(codigoEtiqueta.slice(0, -1))
      );

      if (resp.data && resp.data.length !== 0) {
        const body = {
          CodigoOrden: resp.data[0].CodigoOrden,
          Cliente: resp.data[0].Cliente,
          CodigoArticulo: resp.data[0].CodigoArticulo,
          Modelo: resp.data[0].Modelo,
          Observaciones: resp.data[0].Observaciones,
          Descripcion: resp.data[0].Descripcion,
          CodSeccion: resp.data[0].CodSeccion,
          PedidoLinea: resp.data[0].PedidoLinea,
          CodUtillaje: resp.data[0].CodUtillaje,
          TareasTallas: [],
        };
        for (const tareaTalla of resp.data) {
          body.TareasTallas.push({
            TallaUtillaje: tareaTalla.TallaUtillaje,
            TallasArticulo: tareaTalla.TallasArticulo,
            CantidadFabricar: tareaTalla.CantidadFabricar,
            CantidadSaldos: tareaTalla.CantidadSaldos,
            CantidadFabricada: tareaTalla.CantidadFabricada,
            IdTarea: tareaTalla.IdTarea,
          });
        }

        this.$store.commit("setOperacionSeleccion", body);

        this.$popup("append", {
          uid: "task-selector",
          component: TaskSelector,
        });
      }
    },
    async keyUp(e) {
      if ("activeElement" in document) document.activeElement.blur();
      var code = String(e.code);
      if (code.includes("Numpad") || code.includes("Digit")) {
        this.cadenaLectura += code[code.length - 1];
      } else if (e.code == "F2") {
        e.preventDefault();
      }

      if (this.cadenaLectura.length == 12) {
        let prefijo = this.cadenaLectura[0];
        let etiqueta = this.cadenaLectura;
        this.cadenaLectura = "";
        if (prefijo == "4" && this.$store.getters.hayPuesto) {
          this.ficharPrepaquete(`0${etiqueta}`);
        } else if (prefijo == "0" && this.$store.getters.hayPuesto) {
          this.ficharEtiquetaOperacion(etiqueta);
        } else {
          this.$swal({
            icon: "error",
            title: "Etiqueta no interpretada",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 40px;
}
</style>