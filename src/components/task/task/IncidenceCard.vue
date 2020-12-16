<template>
  <va-button class="finish" color="warning" @click="selectIncidence" large>INCIDENCIA</va-button>
</template>

<script>
import IncidenceSelector from "./modals/IncidenceSelector.vue";

export default {
  methods: {
    selectIncidence() {
      this.$popup("append", {
        uid: "incidence-selector",
        component: IncidenceSelector,
      });
    },
  },
};
</script>

<style scoped>
.finish {
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
  font-size: 40px;
  margin: 1px;
  border-radius: 10px;
}
</style>