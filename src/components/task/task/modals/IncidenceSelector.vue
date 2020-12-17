<template>
  <div class="incidence-selector">
    <h1 class="title">{{ title }}</h1>
    <ul :style="gridStyle" class="incidence-list">
      <va-button
        @click="generateIncidence(incidence)"
        v-for="incidence in incidences"
        v-bind:key="incidence.Nombre"
        v-show="incidence.Habilitada === true"
        class="incidence"
        color="warning"
        large
      >
        <span>{{ incidence.Nombre }}</span>
      </va-button>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      colNumber: 3,
    };
  },
  methods: {
    close() {
      this.$popup("close", "incidence-selector");
    },
    generateIncidence(incidence) {
      try {
        this.$mqtt.publish(
          incidence.AvisarA,
          JSON.stringify(incidence)
        );
        this.$swal({
          icon: "success",
          title: '¡Incidencia registrada!',
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

      this.$popup("close", "incidence-selector");
    },
  },
  computed: {
    incidences() {
      const incidenciaSalir = [{ Nombre: "X         ", Habilitada: true }];
      if (this.$store.getters.hayPuesto) {
        const incidencias = this.$store.getters.puesto.Incidencias;
        return incidencias.concat(incidenciaSalir);
      } else {
        return incidenciaSalir;
      }
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.colNumber}, minmax(100px,1fr))`,
      };
    },
    title() {
      return "Selecciona una incidencia";
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 30px;
  text-align: center;
}

.incidence-selector {
  width: 850px;
}

.incidence-list {
  display: grid;
  grid-gap: 1em;
}

.incidence {
  font-size: 42px;
  width: 250px;
  height: 140px;
}
</style>