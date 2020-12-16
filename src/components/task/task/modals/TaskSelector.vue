<template>
  <div class="task-selector">
    <h1 class="title">{{ title }}</h1>
    <ul :style="gridStyle" class="task-list">
      <va-button
        @click="selectTask(tarea)"
        v-for="tarea in tareas"
        v-bind:key="tarea.ID"
        class="task-size"
        color="primary"
        large
      >
        <span v-if="tarea.TallaUtillaje != '00'">{{
          tarea.TallaUtillaje
        }}</span>
        <span v-else>{{ tarea.TallasArticulo }}</span>
      </va-button>
    </ul>
  </div>
</template>

<script>
import TareaNoSQLService from "../../../../services/api/TareaNoSQLService";

export default {
  data: function () {
    return {
      colNumber: 4,
    };
  },
  methods: {
    async selectTask(taskSize) {
      const task = this.$store.getters.operacionSeleccion;
      const maquinasSchemas = [];
      for (const maquina of this.$store.getters.puesto.Maquinas) {
        const maquinaSchema = {
          idSql: maquina.ID,
          nombre: maquina.Nombre,
          codSeccion: maquina.CodSeccion,
          detallesTarea: [],
        };

        maquinaSchema.detallesTarea.push({
          idSql: taskSize.IdTarea,
          codigoOrden: task.CodigoOrden,
          cliente: task.Cliente.trim(),
          modelo: task.Modelo.trim(),
          referencia: task.CodigoArticulo,
          tallasArticulo: taskSize.TallasArticulo.split(","),
          cantidadFabricar: taskSize.CantidadFabricar,
          cantidadFabricada: taskSize.CantidadFabricada,
          descripcionOperacion: task.Descripcion,
          pedidoLinea: task.PedidoLinea,
        });

        maquinasSchemas.push(maquinaSchema);
      }

      const tareaActual = {
        idPuestoSql: this.$store.getters.puesto.Id,
        maquinas: maquinasSchemas,
        etiquetaFichada: "",
        utillaje: task.CodUtillaje,
        tallaUtillaje: taskSize.TallaUtillaje,
      };

      try {
        const response = await TareaNoSQLService.start(tareaActual);
        this.$store.commit("setTask", response.data);
        this.$swal({
          icon: "success",
          title: "Tarea comenzada",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$popup("close", "task-selector");
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        this.$popup("close", "task-selector");
      }
    },
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.colNumber}, minmax(100px,1fr))`,
      };
    },
    title() {
      if (this.$store.getters.operacionSeleccion === null) return "";
      return `${this.$store.getters.operacionSeleccion.CodigoOrden} 
        ${this.$store.getters.operacionSeleccion.Cliente}`;
    },
    tareas() {
      if (this.$store.getters.operacionSeleccion === null) return [];
      return this.$store.getters.operacionSeleccion.TareasTallas;
    },
  },
};
</script>

<style lang="css" scoped>
.title {
  font-size: 30px;
  text-align: center;
}

.task-selector {
  width: 650px;
}

.task-list {
  display: grid;
  grid-gap: 1em;
}

.task-size {
  font-size: 42px;
  width: 140px;
  height: 140px;
}
</style>

