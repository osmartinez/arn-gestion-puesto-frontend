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
      for (const maquina of this.$store.getters.puesto.Maquinas) {
        const response = await PrepaqueteService.getPrepaquete(
          codigoEtiqueta,
          maquina.CodSeccion
        );
        result.push(response.data)
      }

      return result;
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
          this.$swal({
            icon: "success",
            title: "Etiqueta tarea leída",
            showConfirmButton: false,
            timer: 1500,
          });
          var resultado = await this.ficharPrepaquete(`0${this.cadenaLectura}`);
          console.log(resultado);
          

          
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