<template>
  <div class="flex md6 xs12">
    <va-select
      class="selector"
      :label="titulo"
      v-model="puestoSeleccionado"
      textBy="Descripcion"
      idBy="Id"
      :loading="loading"
      :options="puestos"
      :searchable="true"
      :multiple="false"
    />
    <va-button large color="primary" @click="guardar">Guardar</va-button>
  </div>
</template>

<script>
import PuestoServiceApi from "../../services/api/PuestoService";
import PuestoServiceBackend from "../../services/backend/PuestoService";

export default {
  data: function () {
    return {
      titulo: "Selecciona puesto",
      puestos: [],
      puestoSeleccionado: {},
      loading: true,
    };
  },
  methods: {
    async guardar() {
      if (this.puestoSeleccionado.Id) {
        await PuestoServiceBackend.setPuesto(this.puestoSeleccionado);
        const response = await PuestoServiceBackend.getPuesto();
        this.$store.commit("setPuesto", response.data);
        this.$router.push({ name: "home" });
      }
    },
  },
  mounted: async function () {
    try {
      const response = await PuestoServiceApi.getPuestos();
      this.puestos = response.data;
      if (this.puestos.length > 0) {
        this.puestoSeleccionado = this.puestos[0];
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="css" scoped>
.selector {
  font-size: 40px;
  width: 200px;
  height: 80px;
}
</style>