<template>
  <va-card
    id="packageCard"
    v-bind:class="{ flash: fullPacket }"
    target="_blank"
  >
    <h1 class="h1" @click="setCountPacket()">{{ count }}</h1>
    <h1 class="h1">/</h1>
    <h1 class="h1" @click="setCountPacketSet()">{{ total }}</h1>
  </va-card>
</template>

<script>
import Calculadora from "../../ui/Calculadora";
export default {
  components: {},
  data: function () {
    return {};
  },
  methods: {
    setCountPacket() {
      this.$popup("append", {
        component: Calculadora,
      });
    },
    setCountPacketSet() {},
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

<style lang="css" scoped>
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

.h1 {
  display: inline-block;
  font-size: 120px;
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