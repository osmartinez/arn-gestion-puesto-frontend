<template>
  <va-card
    v-bind:class="{ flash: fullPacket }"
    id="packageCard"
    target="_blank"
  >
    <h1 class="h1">{{ count }}/{{ total }}</h1>
  </va-card>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  computed: {
    total() {
      if (this.$store.getters.hayPuesto) {
        return this.$store.getters.puesto.ContadorPaquetes;
      } else {
        return 0;
      }
    },
    count() {
      return this.$store.getters.contadorPaquetes;
    },
    fullPacket() {
      return this.total === this.count;
    },
  },
};
</script>

<style scoped>
#packageCard {
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
  font-size: 100px;
}

.flash {
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
  font-size: 100px;
  animation: glowing 1500ms infinite;
}

@keyframes glowing {
  0% {
    background-color: white;
    box-shadow: 0 0 3px #220000;
  }

  50% {
    background-color: #ff0000;
    box-shadow: 0 0 40px #ff0000;
    color: yellow;
  }

  100% {
    background-color: white;
    box-shadow: 0 0 3px #b20000;
  }
}
</style>