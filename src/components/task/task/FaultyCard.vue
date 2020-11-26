<template>
  <va-card class="faulty">
    <div class="marcador">
      <h1 class="h1">{{ cantidadDefectuosa }}</h1>
      <h4 class="h4">
        <i v-show="isDecreasing" class="va-icon fa fa-arrow-down"></i>
        <i v-show="isIncreasing" class="va-icon fa fa-arrow-up"></i>
        <span v-show="isIncreasingOrDecreasing">{{ faults }}</span>
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
import TareaNoSQLService from "../../../services/api/TareaNoSQLService";

export default {
  components: {},
  data: function () {
    return {
      decreasing: false,
      increasing: false,
      faults: 0,
      timerIncrease: null,
      timerDecrease: null,
    };
  },
  methods: {
    async insertFaults() {
      try {
        const response = await TareaNoSQLService.addFaulty({
          idPuesto: this.$store.getters.puesto.Id,
          defectuosas: this.faults,
        });

        if (response.data != null && response.data._id) {
          this.$store.commit("setTask", response.data);
        }

        let countPaquetes = this.$store.getters.contadorPaquetes;
        let faults = this.faults;
        countPaquetes = countPaquetes + faults;
        if (countPaquetes < 0) countPaquetes = countPaquetes * -1;
        countPaquetes =
          countPaquetes % this.$store.getters.puesto.ContadorPaquetes;
        if (countPaquetes == 0)
          countPaquetes = this.$store.getters.puesto.ContadorPaquetes;
        this.$store.commit("setCountPacket", countPaquetes);
      } catch (error) {
        this.$swal({
          icon: "error",
          title: (typeof error.response !== 'undefined')?error.response.data.message:error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    increase() {
      this.decreasing = false;
      this.increasing = true;

      this.faults++;

      if (this.timerDecrease != null) clearTimeout(this.timerDecrease);
      if (this.timerIncrease != null) clearTimeout(this.timerIncrease);

      this.timerIncrease = setTimeout(async () => {
        this.increasing = false;
        if (this.faults != 0) {
          await this.insertFaults();
        }

        this.faults = 0;
      }, 2000);
    },

    decrease() {
      this.increasing = false;
      this.decreasing = true;

      this.faults--;
      if (this.timerDecrease != null) clearTimeout(this.timerDecrease);
      if (this.timerIncrease != null) clearTimeout(this.timerIncrease);

      this.timerDecrease = setTimeout(async () => {
        this.decreasing = false;

        if (this.faults != 0) {
          await this.insertFaults();
        }

        this.faults = 0;
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
    cantidadDefectuosa() {
      let cantidadDefectuosa = 0;
      if (this.$store.getters.hayTarea) {
        for (const pulso of this.$store.getters.tarea
          .cantidadDefectuosaPuesto) {
          cantidadDefectuosa += pulso.cantidad;
        }
      }
      return cantidadDefectuosa;
    },
  },
};
</script>

<style scoped>
.faulty {
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