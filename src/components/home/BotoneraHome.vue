<template>
  <div class="botonera">
    <router-link
      v-for="accion in acciones"
      :key="accion.nombre"
      :to="{ name: accion.ruta }"
    >
      <va-button large class="btn">{{ accion.nombre }}</va-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      acciones: [
        {
          nombre: "FICHAR",
          ruta: "user",
        },
        {
          nombre: "TAREA",
          ruta: "task",
        },
        {
          nombre: "MÁQUINA",
          ruta: "machine",
        },
      ],
    };
  },
};
</script>

<style scoped>
.btn {
  width: 210px;
  height: 210px;
  font-size: 30px;
}
</style>