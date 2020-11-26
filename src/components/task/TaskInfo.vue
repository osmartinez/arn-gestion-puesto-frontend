<template>
  <div class="task">
    <grid-layout
      :layout.sync="layout"
      :col-num="2"
      :row-height="300"
      :is-resizable="false"
      :is-draggable="true"
      :is-mirrored="false"
      :vertical-compact="false"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        :i="layout[0].i"
        :x="layout[0].x"
        :y="layout[0].y"
        :w="layout[0].w"
        :h="layout[0].h"
      >
      </grid-item>
      
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  data: function () {
    return {
      layout: [
        { x: 0, y: 0, w: 2, h: 0, i: "1" },
      ],
    };
  },
};
</script>

<style scoped>
</style>