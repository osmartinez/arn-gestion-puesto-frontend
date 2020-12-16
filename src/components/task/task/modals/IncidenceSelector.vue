<template>
  <div id="incidence-selector">
    <table>
      <tr>
        <td>
          <va-button class="incidence-button" color="warning" large
            >FALTA TAREA</va-button
          >
        </td>
        <td>
          <va-button class="incidence-button" color="warning" large
            >FALTA UTILLAJE</va-button
          >
        </td>
        <td>
          <va-button class="incidence-button" color="warning" large
            >CAMBIO URGENTE</va-button
          >
        </td>
      </tr>
      <tr>
        <td>
          <va-button class="incidence-button" color="warning" large
            >TAREA DEFECTO</va-button
          >
        </td>
        <td>
          <va-button class="incidence-button" color="warning" large
            >INCIDENCIA 1</va-button
          >
        </td>
        <td>
          <va-button
            @click="close"
            class="incidence-button"
            color="danger"
            large
            >SALIR .........</va-button
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$popup("close", "incidence-selector");
    },
  },
};
</script>

<style scoped>
.incidence-button {
  width: 250px;
  height: 190px;
  max-height: 400px;
  text-align: center;
  font-size: 40px;
  margin: 1px;
  border-radius: 10px;
}
</style>