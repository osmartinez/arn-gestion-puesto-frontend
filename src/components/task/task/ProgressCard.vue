<template>
  <va-card class="progress">
    <h1 class="h1">{{ codigoUtillaje }}</h1>
    <h1 class="h1">{{ tallaUtillaje }}</h1>
    <h1 class="h1">{{ contador }}</h1>
  </va-card>
</template>
<script>
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
          return `<${this.$store.getters.tarea.maquinas[0].detallesTarea[0].tallasArticulo.join(',')}>`
        } else {
          return `<${this.$store.getters.tarea.tallaUtillaje}>`;
        }
      } else {
        return "";
      }
    },
    contador() {
      if (this.$store.getters.hayTarea) {
        let cantidadFabricada = 0;
        let cantidadFabricar = 0;

        for (const detalle of this.$store.getters.tarea.maquinas[0]
          .detallesTarea) {
          cantidadFabricar += detalle.cantidadFabricar;
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

        return `${cantidadFabricada}/${cantidadFabricar}`;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.progress {
  /* width: 227px;
   height: 168px;
  */
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
}

.h1 {
  font-size: 43px;
}
</style>