<template>
  <app-page-layout
    class="app-layout"
    :is-top-bar.sync="isTopBar"
    :minimized.sync="minimized"
    :mobile-width="mobileWidth"
  >
    <app-navbar
      class="app-layout__navbar"
      :is-top-bar.sync="isTopBar"
      :minimized.sync="minimized"
    />
    <app-topbar class="app-layout__topbar" v-if="isTopBar" />
    <div class="app-layout__container">
      <app-sidebar
        class="app-layout__sidebar"
        v-if="!isTopBar"
        :minimized="minimized"
      />
      <div
        class="app-layout__main"
        :class="{ 'app-layout__main--top': isTopBar }"
      >
        <main
          class="app-layout__main-layout layout fluid gutter--xl"
          slot="content"
          role="main"
        >
          <router-view />
        </main>
      </div>
    </div>
  </app-page-layout>
</template>

<script>
import PuestoBackendService from "../../services/backend/PuestoService";
import MovimientoOperarioService from "../../services/api/MovimientoOperarioService";
import TareaNoSQLService from "../../services/api/TareaNoSQLService";

import AppPageLayout from "./AppPageLayout";
import AppNavbar from "./app-navbar/AppNavbar";
import AppTopbar from "./app-topbar/AppTopbar";
import AppSidebar from "./app-sidebar/AppSidebar";
import { originalTheme, corporateTheme } from "vuestic-ui/src/services/themes";
import {
  ColorThemeActionsMixin,
  ColorThemeMixin,
} from "../../services/vuestic-ui";

export default {
  name: "app-layout",
  components: {
    AppPageLayout,
    AppNavbar,
    AppTopbar,
    AppSidebar,
  },
  data() {
    return {
      isTopBar: false,
      minimized: false,
      mobileWidth: 767,
      intervaloPuesto: null,
    };
  },
  inject: ["contextConfig"],
  mixins: [ColorThemeActionsMixin, ColorThemeMixin],
  created() {
    // if (this.$route.query && this.$route.query.theme === 'corporate') {
    this.setTheme("corporate");
    // }
    this.$root.$on("change-theme", this.setTheme);
  },
  beforeDestroy() {
    this.$root.$off("change-theme", this.setTheme);
  },
  methods: {
    setTheme(themeName) {
      const theme = themeName === "corporate" ? corporateTheme : originalTheme;
      this.setColors(theme.colors);
      Object.keys(theme.context).forEach((key) => {
        this.contextConfig[key] = theme.context[key];
      });
    },
    async puestoHermanoLogin(msg) {
      const obj = JSON.parse(msg);
      const body = {
        idPuesto: this.$store.getters.puesto.Id,
        codigo: String(obj.codigoOperario),
      };

      try {
        const response = await MovimientoOperarioService.login(body);
        this.$store.commit("setOperarios", response.data);
      } catch (err) {
        this.$swal({
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async puestoHermanoLogout(msg) {
      const obj = JSON.parse(msg);

      try {
        const body = {
          idPuesto: this.$store.getters.puesto.Id,
          codigo: obj.codigoOperario,
        };
        const response = await MovimientoOperarioService.logout(body);
        this.$store.commit("setOperarios", response.data);
      } catch (err) {
        console.log(err);
      }
    },
  },

  mounted: async function () {
    if (!this.$store.getters.hayPuesto) {
      const response = await PuestoBackendService.getPuesto();
      this.$store.commit("setPuesto", response.data);

      while (!this.$store.getters.hayPuesto) {
        const response = await PuestoBackendService.getPuesto();
        this.$store.commit("setPuesto", response.data);
      }

      if (this.$store.getters.hayPuesto) {
        // asignación callbacks mqtt
        this.$mqtt.callbacks[
          `/puestos/${this.$store.getters.puesto.IdPuestoHermano}/login`
        ] = this.puestoHermanoLogin;
        this.$mqtt.callbacks[
          `/puestos/${this.$store.getters.puesto.IdPuestoHermano}/logout`
        ] = this.puestoHermanoLogout;

        // buscar todos los operarios que hay actualmente en el puesto y meterlos en la store
        const response2 = await MovimientoOperarioService.findAll({
          idPuesto: this.$store.getters.puesto.Id,
        });
        this.$store.commit("setOperarios", response2.data);

        // obtener tarea actual en ejecución en este puesto
        const response3 = await TareaNoSQLService.getCurrentTask(
          this.$store.getters.puesto.Id
        );
        if (response3.data != null && response3.data._id) {
          this.$store.commit("setTask", response3.data);
        }
      }
    }
  },
};
</script>

<style lang="scss">
.app-layout {
  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    // TODO Probably there is a better way to achieve this.
    height: calc(100% - 65px);

    @include media-breakpoint-down(sm) {
      height: calc(100% - 110px);
    }
  }

  &__main {
    box-sizing: border-box;
    width: 100%;
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    position: relative;
    max-height: 100%;
    min-height: 100%;

    &-layout {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: auto;
      box-sizing: border-box;
      min-height: 100%;
      margin: 0;
    }
  }
}
</style>
