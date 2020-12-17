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
import { startFromOperationLabel } from "../../../../services/task-services/task.procedures";

export default {
  data: function () {
    return {
      colNumber: 4,
    };
  },
  methods: {
    async selectTask(taskSize) {
      const task = this.$store.getters.operacionSeleccion;
      let res = "";
      try {
        res = await startFromOperationLabel(task, taskSize, this.$store);
        this.$popup("close", "task-selector");
        this.$swal({
          icon: "success",
          title: res,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        this.$popup("close", "task-selector");

        this.$swal({
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1500,
        });
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

