<template>
  <va-card
    v-bind:class="{ flash: taskCompleted }"
    id="progressCard"
    target="_blank"
  >
    <h1 class="h1">{{ codigoUtillaje }}</h1>
    <h1 class="h1">{{ tallaUtillaje }}</h1>
    <h1 class="h1">{{ contador }}/{{ cantidadFabricar }}</h1>
  </va-card>
</template>
<script>
import GpioService from "../../../services/backend/GpioService";

export default {
  computed: {
    codigoUtillaje() {
      if (this.$store.getters.hayTarea) {
        return this.$store.getters.tarea.utillaje;
      } else {
        return "";
      }
    },
    tallaUtillaje() {
      if (this.$store.getters.hayTarea) {
        if (this.$store.getters.tarea.tallaUtillaje === "00") {
          return `<${this.$store.getters.tarea.maquinas[0].detallesTarea[0].tallasArticulo.join(
            ","
          )}>`;
        } else {
          return `<${this.$store.getters.tarea.tallaUtillaje}>`;
        }
      } else {
        return "";
      }
    },
    cantidadFabricar() {
      if (this.$store.getters.hayTarea) {
        let cantidadFabricar = 0;

        for (const detalle of this.$store.getters.tarea.maquinas[0]
          .detallesTarea) {
          cantidadFabricar += detalle.cantidadFabricar;
        }

        return cantidadFabricar;
      } else {
        return 0;
      }
    },
    contador() {
      if (this.$store.getters.hayTarea) {
        let cantidadFabricada = 0;

        for (const detalle of this.$store.getters.tarea.maquinas[0]
          .detallesTarea) {
          cantidadFabricada += detalle.cantidadFabricada;
        }

        for (const pulso of this.$store.getters.tarea.cantidadFabricadaPuesto) {
          cantidadFabricada += pulso.cantidad;
        }

        for (const pulso of this.$store.getters.tarea
          .cantidadDefectuosaPuesto) {
          cantidadFabricada += pulso.cantidad;
        }

        for (const pulso of this.$store.getters.tarea.cantidadSaldosPuesto) {
          cantidadFabricada -= pulso.cantidad;
        }

        return cantidadFabricada;
      } else {
        return 0;
      }
    },
    taskCompleted() {
      if (
        this.$store.getters.hayPuesto &&
        this.$store.getters.hayTarea &&
        this.$store.getters.puesto.AvisarFinTarea &&
        this.contador === this.cantidadFabricar
      ) {
        GpioService.taskCountReached(this.$store.getters.puesto.PinBuzzer,[300,300,300]);
      }

      return (
        this.cantidadFabricar !== 0 && this.contador >= this.cantidadFabricar
      );
    },
  },
};
</script>

<style scoped>
#progressCard {
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
}

.h1 {
  font-size: 43px;
}

.flash {
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
  font-size: 100px;
  animation: glowing 1000ms infinite;
}

@keyframes glowing {
  0% {
    background-color: white;
    box-shadow: 0 0 3px #220000;
  }

  50% {
    background-color: #ff0000;
    box-shadow: 0 0 40px #ff0000;
    color: yellow;
  }

  100% {
    background-color: white;
    box-shadow: 0 0 3px #b20000;
  }
}
</style>