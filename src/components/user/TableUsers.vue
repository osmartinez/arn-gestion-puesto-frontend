<template>
  <div class="table-users">
    <va-card>
      <va-data-table
        :fields="fields"
        :data="items"
        :loading="loading"
        :totalPages="totalPages"
        @page-selected="readItems"
        :fontSize="29"
        api-mode
      >
      <template slot="boton-salir" slot-scope="props">
        <va-button color="danger" large @click="salir(props.rowData.codigo)"><i class="va-icon fa fa-user-times"></i></va-button>
      </template>
      </va-data-table>
    </va-card>
  </div>
</template>

<script>
export default {
  name: "table-users",
  data() {
    return {
      perPage: 10,
      totalPages: 0,
      items: [
        { codigo: "B00580", nombre: "OSCAR MARTINEZ" },
        { codigo: "B00581", nombre: "PEPE PEREZ" },
      ],
      loading: false,
    };
  },
  methods:{
    salir(codigo){
      alert(codigo)
    }
  },
  computed: {
    fields() {
      return [
        {
          name: "codigo",
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
  },
};
</script>

<style lang="css" scoped>
.table-users {
  font-size: 20px;
}
</style>