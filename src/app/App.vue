<template>
  <div id="app">
    <router-view />
    <VuePopupPlugin :config="popupDefaultConfig" />
  </div>
</template>

<script>
import Vue from "vue";
import CiaoVuePopup from "ciao-vue-popup";
Vue.use(CiaoVuePopup);
export default {
  name: "app",
  data() {
    return {
      // Temporary config for 2.1.
      popupDefaultConfig: {
        title: "ARNEPLANT",
        
      },
      contextConfig: {
        gradient: true,
        shadow: "lg", // 3 states: 'sm', 'lg', undefined (no shadow).
        invertedColor: false,
      },
    };
  },

  provide() {
    return {
      contextConfig: this.contextConfig,
    };
  },
  watch: {
    // Temporary colors fix for 2.1.
    "contextConfig.invertedColor"(val) {
      const invertedColorClass = "va-inverted-color";
      if (val) {
        document.body.classList.add(invertedColorClass);
      } else {
        document.body.classList.remove(invertedColorClass);
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../node_modules/ciao-vue-popup/dist/ciao-vue-popup.css";
@import "../sass/main.scss";

body {
  height: 100%;

  #app {
    height: 100%;
  }
}
</style>