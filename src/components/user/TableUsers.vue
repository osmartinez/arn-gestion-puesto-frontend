<template>
  <div class="table-users">
    <va-card>
      <va-data-table
        :fields="fields"
        :data="items"
        :loading="loading"
        :totalPages="totalPages"
        :fontSize="29"
        api-mode
      >
        <template slot="boton-salir" slot-scope="props">
          <va-button
            color="danger"
            large
            @click="salir(props.rowData.codigoOperarioSql)"
            ><i class="va-icon fa fa-user-times"></i
          ></va-button>
        </template>
      </va-data-table>
    </va-card>
  </div>
</template>

<script>
import MovimientoOperarioService from "../../services/api/MovimientoOperarioService";

export default {
  name: "table-users",
  data() {
    return {
      perPage: 10,
      totalPages: 0,
      loading: false,
      pulso: false,
    };
  },
  methods: {
    async salir(codigo) {
      try {
        const body = {
          idPuesto: this.$store.getters.puesto.Id,
          codigo: codigo,
        };
        const response = await MovimientoOperarioService.logout(body);
        //this.items = this.items.filter((x) => x.codigo !== codigo);
        this.$store.commit("setOperarios", response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    fields() {
      return [
        {
          name: "codigoOperarioSql",
          title: this.$t("fichajes.worker_code"),
          width: "90px",
        },
        {
          name: "nombre",
          title: this.$t("fichajes.worker_name"),
          width: "300px",
        },
        {
          name: "__slot:boton-salir",
          width: "40px",
        },
      ];
    },
    items() {
      return this.$store.getters.operarios;
    },
  },
};
</script>

<style lang="css" scoped>
.table-users {
  font-size: 20px;
}
</style>