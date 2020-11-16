<template>
  <div class="login">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="0"
      :is-resizable="false"
      :is-draggable="false"
      :is-mirrored="false"
      :vertical-compact="false"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      
      <grid-item :i="layout[0].i" :x="layout[0].x" :y="layout[0].y" :w="layout[0].w" :h="layout[0].h">
        <login-machine></login-machine>
      </grid-item>
      <grid-item :i="layout[0].i" :x="layout[1].x" :y="layout[1].y" :w="layout[1].w" :h="layout[1].h">
        <table-users></table-users>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import LoginMachine from "./LoginMachine.vue";
import TableUsers from "./TableUsers.vue";
import VueGridLayout from "vue-grid-layout";

export default {
  components: {
    LoginMachine,
    TableUsers,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data: function () {
    return {
      layout: [
        { x: 0, y: 0, w: 6, h: 2, i: "1" },
        { x: 6, y: 0, w: 6, h: 2, i: "0" },
      ],
    };
  },
};
</script>

<style scoped>
</style>