<template>
  <div class="task">
    <vue-tabs type="pills" centered active-text-color="white">
      <v-tab title="Tarea">
        <task-progress></task-progress>
      </v-tab>
      <v-tab title="Información tarea"> Info. tarea </v-tab>
      <v-tab title="Programación"> Programación </v-tab>
      <v-tab title="Estadísticas"> Estadísticas </v-tab>
      <v-tab title="Histórico acciones"> Histórico </v-tab>
    </vue-tabs>
  </div>
</template>

<script>
import GpioService from "../../services/backend/GpioService";
import PrepaqueteService from "../../services/api/PrepaqueteService";
import TareaNoSQLService from "../../services/api/TareaNoSQLService";

import TaskProgress from "./Task";

export default {
  components: {
    TaskProgress,
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
          contador = this.$store.getters.contadorPaquetes+maquina.ProductoPorPulso;
          if(contador == this.$store.getters.puesto.ContadorPaquetes){
            GpioService.packetCountReached(this.$store.getters.puesto.PinBuzzer)
          }
        }
        this.$store.commit("setCountPacket", contador);
        this.$store.commit("addPulseTask", pulse);
      }
    },
    async ficharPrepaquete(codigoEtiqueta) {
      const result = [];

      const maquinasSchemas = [];
      let utillaje = "";
      let tallaUtillaje = "";
      for (const maquina of this.$store.getters.puesto.Maquinas) {
        const response = await PrepaqueteService.getPrepaquete(
          codigoEtiqueta,
          maquina.CodSeccion
        );
        if (response.data == null || response.data.length == 0) {
          return null;
        }

        result.push(response.data);

        const maquinaSchema = {
          idSql: maquina.ID,
          nombre: maquina.Nombre,
          codSeccion: maquina.CodSeccion,
          detallesTarea: [],
        };

        for (const tarea of response.data) {
          utillaje = tarea.CodUtillaje;
          tallaUtillaje = tarea.IdUtillajeTalla;

          maquinaSchema.detallesTarea.push({
            idSql: tarea.IdTarea,
            codigoOrden: tarea.Codigo,
            cliente: tarea.NOMBRECLI.trim(),
            modelo: tarea.DESCRIPCIONARTICULO.trim(),
            referencia: tarea.CodigoArticulo,
            tallasArticulo: tarea.Tallas.split(","),
            cantidadFabricar: tarea.CantidadFabricar,
            cantidadFabricada: tarea.CantidadFabricada,
            descripcionOperacion: tarea.Descripcion,
            pedidoLinea: tarea.PedidoLinea,
          });
        }

        maquinasSchemas.push(maquinaSchema);
      }

      const tareaActual = {
        idPuestoSql: this.$store.getters.puesto.Id,
        maquinas: maquinasSchemas,
        etiquetaFichada: codigoEtiqueta,
        utillaje: utillaje,
        tallaUtillaje: tallaUtillaje,
      };

      return tareaActual;
    },
    async keyUp(e) {
      var code = String(e.code);
      if (code.includes("Numpad") || code.includes("Digit")) {
        this.cadenaLectura += code[code.length - 1];
      } else if (e.code == "F2") {
        e.preventDefault();
      }

      if (this.cadenaLectura.length == 12) {
        let prefijo = this.cadenaLectura[0];
        if (prefijo == "4") {
          var tareaNoSql = await this.ficharPrepaquete(
            `0${this.cadenaLectura}`
          );

          if (tareaNoSql == null) {
            this.$swal({
              icon: "error",
              title: "La etiqueta no existe",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            try {
              const response = await TareaNoSQLService.start(tareaNoSql);
              this.$store.commit("setTask", response.data);
              this.$swal({
                icon: "success",
                title: "Tarea comenzada",
                showConfirmButton: false,
                timer: 1500,
              });
            } catch (err) {
              this.$swal({
                icon: "error",
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }
        } else if (prefijo == "0") {
          this.$swal({
            icon: "success",
            title: "Etiqueta proceso leída",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          //error(`Codigo no reconocido\n${cadenaLectura}`);
        }
        this.cadenaLectura = "";
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