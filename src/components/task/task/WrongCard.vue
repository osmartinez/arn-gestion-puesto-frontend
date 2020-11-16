<template>
  <va-card class="wrongs">
    <div class="marcador">
      <h1 class="h1">{{cantidadSaldos}}</h1>
      <h4 class="h4">
        <i v-show="isDecreasing" class="va-icon fa fa-arrow-down"></i>
        <i v-show="isIncreasing" class="va-icon fa fa-arrow-up"></i>
        <span v-show="isIncreasingOrDecreasing">{{wrongs}}</span>
      </h4>
    </div>

    <va-button class="btn" large color="primary" @click="decrease"
      ><i class="va-icon fa fa-minus"></i
    ></va-button>

    <va-button class="btn" large color="primary" @click="increase"
      ><i class="va-icon fa fa-plus"></i
    ></va-button>
  </va-card>
</template>

<script>
export default {
  components: {},
  data: function () {
    return {
      decreasing: false,
      increasing: false,
      wrongs: 0,
      timerIncrease: null,
      timerDecrease: null,
    };
  },
  methods: {
    increase() {
      this.decreasing = false;
      this.increasing = true;

      this.wrongs++

      if(this.timerDecrease != null) clearTimeout(this.timerDecrease)
      if(this.timerIncrease != null) clearTimeout(this.timerIncrease)
      
      this.timerIncrease = setTimeout(() => {
        this.increasing = false;

        // backend

        this.wrongs = 0
      }, 2000);
    },
    decrease() {
      this.increasing = false;
      this.decreasing = true;

      this.wrongs--
      if(this.timerDecrease != null) clearTimeout(this.timerDecrease)
      if(this.timerIncrease != null) clearTimeout(this.timerIncrease)

      this.timerDecrease=setTimeout(() => {
        this.decreasing = false;

        // backend call

        this.wrongs = 0
      }, 2000);
    },
  },
  computed: {
    isIncreasing() {
      return this.increasing;
    },
    isDecreasing() {
      return this.decreasing;
    },
    isIncreasingOrDecreasing() {
      return this.decreasing || this.increasing;
    },
    cantidadSaldos() {
      let cantidadSaldos = 0;
      if (this.$store.getters.hayTarea) {
        for (const pulso in this.$store.getters.tarea.cantidadSaldosPuesto) {
          cantidadSaldos += pulso.cantidad;
        }
      }
      return cantidadSaldos;
    },
  },
};
</script>

<style scoped>
.wrongs {
  /* width: 227px;
   height: 168px;
  */
  width: 100%;
  height: 100%;
  max-height: 400px;
  text-align: center;
}

.h1 {
  font-size: 43px;
  display: inline-block;
}

.h4 {
  margin-left: 44px;
  font-size: 33px;
  display: inline-block;
}

.btn {
  width: 95px;
  height: 95px;
  font-size: 40px;
}
</style>