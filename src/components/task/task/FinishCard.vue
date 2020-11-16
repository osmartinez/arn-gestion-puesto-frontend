<template>
  <va-button class="finish" color="success" large @click="finish"
    >TERMINAR</va-button
  >
</template>

<script>
import TareaNoSQLService from "../../../services/api/TareaNoSQLService";
export default {
  methods: {
    async finish() {
      if (this.$store.getters.puesto.EsManual) {
        alert("manual");
      } else {
        if (this.$store.getters.hayPuesto) {
          try {
            const response = await TareaNoSQLService.end({
              idPuesto: this.$store.getters.puesto.Id,
            });
            if (response.data == null || !response.data._id) {
              this.$store.commit("removeTask");
            } else {
              this.$store.commit("setTask", response.data);
            }
          } catch (err) {
            this.$swal({
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      }
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