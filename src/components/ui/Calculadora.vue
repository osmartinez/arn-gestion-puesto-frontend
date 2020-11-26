<template>
  <div id="calculator">
    <input type="string" class="calculator-input" v-model="value" />

    <div class="calculator-row">
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(1)">1</button>
      </div>
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(2)">2</button>
      </div>
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(3)">3</button>
      </div>
    </div>
    <div class="calculator-row">
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(4)">4</button>
      </div>
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(5)">5</button>
      </div>
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(6)">6</button>
      </div>
    </div>
    <div class="calculator-row">
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(7)">7</button>
      </div>
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(8)">8</button>
      </div>
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(9)">9</button>
      </div>
    </div>
    <div class="calculator-row">
      <div class="calculator-col">
        <button class="calculator-btn danger action" @click="del()">
          &lt;
        </button>
      </div>
      <div class="calculator-col">
        <button class="calculator-btn" @click="addExpresion(0)">0</button>
      </div>

      <div class="calculator-col">
        <button class="calculator-btn success action" @click="login">
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      value: 0,
    };
  },
  methods: {
    addExpresion(e) {
      if (Number.isInteger(this.value)) this.value = "";
      this.value += e;
    },
    clear() {
      this.value = 0;
    },
    del() {
      this.value = this.value.slice(0, -1);
    },
    async login() {
      
    },
  },
};
</script>

<style lang="scss" scoped>
$darker: #2f2f31;
$dark: #424345;
$gray: #616163;
$white: #ffffff;
$light: #d2d3d4;
$accent: #f49e3f;
$success: #70b93f;
$danger: #bd2612;

*,
::after,
::before {
  box-sizing: border-box;
}

//  CALCULATOR  \\
#calculator {
  width: 100%;
  display: flex;
  height: 400px;
  max-width: 400px;
  padding: 0;
  flex-direction: column;
  background-color: $darker;

  .calculator-input {
    color: $light;
    width: 100%;
    border: none;
    padding: 0.4rem;
    display: block;
    font-size: 2.9rem;
    background: none;
    text-align: right;
    font-weight: lighter;

    &:active {
      outline: none;
    }
  }

  .calculator-row {
    display: flex;
    padding: 0;
    justify-content: space-around;

    .calculator-col {
      flex: 1;
      box-shadow: 0 0 0 1px $darker;

      &.wide {
        flex: 2;
      }
    }
  }

  .calculator-btn {
    width: 100%;
    color: $light;
    border: none;
    cursor: pointer;
    padding: 0.8rem;
    outline: none;
    font-size: 3.1rem;
    transition: all 0.3s ease-in-out;
    min-width: 100px;
    justify-content: center;
    background-color: $gray;

    &.accent {
      background-color: $accent;
      color: $white;
    }

    &.gray {
      background-color: $dark;
    }

    &.success {
      background-color: $success;
    }

    &.danger {
      background-color: $danger;
    }

    &:active {
      background-color: $darker;
    }
  }
}
</style>