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
    };
  },
  mounted: function () {
    this.hiloLectura = setInterval(this.getGpioState, 3000);
    document.addEventListener("keyup", this.keyUp, false);
  },
  beforeDestroy: function () {
    clearInterval(this.hiloLectura);
  },
  methods: {
    async getGpioState() {
      try {
        const response = await GpioService.getGpioState();
        console.log(response.data);
      } catch (err) {
        console.log(err);
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
        // F1 PRESIONADO SIMULAR PULSO
        /*$.ajax({
          method: "POST",
          timeout: 3000,
          url: `/dashboard/tarea/pulsoSimulado`,
          dataType: "json",
          success: (tareasActualesPuesto) => {
            if (tareasActualesPuesto != null) {
              Puesto.refrescarTareasPuesto(tareasActualesPuesto);
            }
          },
          error: (err) => {
            error(err.responseJSON.message);
          },
        });*/
        e.preventDefault();
      }

      if (this.cadenaLectura.length == 12) {
        let prefijo = this.cadenaLectura[0];
        if (prefijo == "4") {
          var tareaNoSql = await this.ficharPrepaquete(
            `0${this.cadenaLectura}`
          );

          try {
            const response = await TareaNoSQLService.start(tareaNoSql);
            this.$store.commit('setTarea',response.data)
            console.log(this.$store.getters.tarea)
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
        } else if (prefijo == "0") {
          this.$swal({
            icon: "success",
            title: "Etiqueta proceso leída",
            showConfirmButton: false,
            timer: 1500,
          });

          //info(`Codigo OF reconocido\n${cadenaLectura}`)
          //buscarOF(cadenaLectura)
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