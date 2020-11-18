<template>
  <div class="task">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="110"
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
        <progress-card></progress-card>
      </grid-item>
      <grid-item
        :i="layout[1].i"
        :x="layout[1].x"
        :y="layout[1].y"
        :w="layout[1].w"
        :h="layout[1].h"
      >
        <faulty-card></faulty-card>
      </grid-item>

      <grid-item
        :i="layout[2].i"
        :x="layout[2].x"
        :y="layout[2].y"
        :w="layout[2].w"
        :h="layout[2].h"
      >
        <wrong-card></wrong-card>
      </grid-item>

      <grid-item
        :i="layout[3].i"
        :x="layout[3].x"
        :y="layout[3].y"
        :w="layout[3].w"
        :h="layout[3].h"
      >
        <finish-card></finish-card>
      </grid-item>

      <grid-item
        :i="layout[4].i"
        :x="layout[4].x"
        :y="layout[4].y"
        :w="layout[4].w"
        :h="layout[4].h"
      >
        <incidence-card></incidence-card>
      </grid-item>

      <grid-item
        :i="layout[5].i"
        :x="layout[5].x"
        :y="layout[5].y"
        :w="layout[5].w"
        :h="layout[5].h"
      >
        <package-card></package-card>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import ProgressCard from "./task/ProgressCard";
import FaultyCard from "./task/FaultyCard";
import WrongCard from "./task/WrongCard";
import FinishCard from "./task/FinishCard";
import IncidenceCard from "./task/IncidenceCard";
import PackageCard from "./task/PackageCard";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    ProgressCard,
    FaultyCard,
    WrongCard,
    FinishCard,
    IncidenceCard,
    PackageCard,
  },
  data: function () {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 2, i: "1" },
        { x: 4, y: 0, w: 4, h: 2, i: "2" },
        { x: 8, y: 0, w: 4, h: 2, i: "3" },

        { x: 0, y: 0, w: 4, h: 2, i: "4" },
        { x: 4, y: 0, w: 4, h: 2, i: "5" },
        { x: 8, y: 0, w: 4, h: 2, i: "6" },
      ],
    };
  },
};
</script>

<style scoped>
</style>