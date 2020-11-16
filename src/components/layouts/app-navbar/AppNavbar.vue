<template>
  <nav class="app-navbar" :style="navbarStyle">
    <div class="app-navbar__content row">
      <div class="app-navbar__menu-container">
        <router-link class="app-navbar__logo mr-3" to="/">
          <va-icon-vuestic />
        </router-link>
      </div>
      <div>
        <router-link to="home">
          <va-button large color="primary" icon="fa fa-cogs" target="_blank">
            {{ nombrePuesto }}
          </va-button>
        </router-link>
      </div>

      <div>
        <router-link to="user">
          <va-button
            v-bind:class="{ flash: noHayOperarios }"
            large
            color="primary"
            icon="fa fa-user"
            target="_blank"
          >
            Operarios({{ numOperarios }})
          </va-button>
        </router-link>
      </div>

      <app-navbar-actions
        class="app-navbar__actions md5 lg4"
        :is-top-bar.sync="isTopBarProxy"
      />
    </div>
    <div class="app-navbar__shape" :style="shapeStyle"></div>
  </nav>
</template>

<script>
import AppNavbarActions from "./components/AppNavbarActions";
import { colorShiftHsl, ColorThemeMixin } from "../../../services/vuestic-ui";
import VaIconVuestic from "../../../iconset/VaIconVuestic";

export default {
  name: "app-navbar",
  mixins: [ColorThemeMixin],
  inject: ["contextConfig"],
  components: {
    AppNavbarActions,
    VaIconVuestic,
  },
  props: {
    isTopBar: {
      type: Boolean,
      required: true,
    },
    minimized: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    return {};
  },
  computed: {
    nombrePuesto: {
      get() {
        const puesto = this.$store.getters.puesto;
        if (puesto == null) {
          return "<SIN ASIGNAR>";
        } else {
          return puesto.Descripcion;
        }
      },
    },
    numOperarios() {
      return this.$store.getters.operarios.length
    },
    noHayOperarios() {
      return !this.$store.getters.hayOperarios;
    },
    isTopBarProxy: {
      get() {
        return this.isTopBar;
      },
      set(isTopBar) {
        this.$emit("update:isTopBar", isTopBar);
      },
    },
    minimizedProxy: {
      get() {
        return this.minimized;
      },
      set(minimized) {
        this.$emit("update:minimized", minimized);
      },
    },
    navbarStyle() {
      const style = {
        backgroundColor: "white",
      };

      if (this.contextConfig.gradient) {
        style.backgroundColor = colorShiftHsl(this.$themes.secondary, {
          s: -13,
          l: 15,
        }).css;
      }

      if (this.contextConfig.shadow === "sm") {
        style.boxShadow = !this.isTopBar
          ? "0 2px 3px 0 rgba(52, 56, 85, 0.25)"
          : null;
      }
      return style;
    },

    shapeStyle() {
      return {
        borderTopColor: this.contextConfig.gradient
          ? colorShiftHsl(this.$themes.secondary, {
              h: -1,
              s: -11,
              l: 10,
            }).css
          : "transparent",
      };
    },
  },
};
</script>

<style lang="scss">
$nav-border-side-width: 3.1875rem;

.app-navbar {
  transition: background-color 0.3s ease; /* sidebar's bg color transitions as well -> consistency */
  display: flex;
  padding-right: 20px;
  z-index: 1;

  &__content {
    z-index: 1;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    flex: 1 1 auto;
  }

  &__center {
    display: flex;
    margin-left: 3rem;
    justify-content: space-between;
    align-items: center;
  }

  &__text {
    color: $lighter-gray;
  }

  &__button {
    width: 10rem;
    margin: 0 0 0 1rem !important;
    font-weight: bold;

    .va-button__content__icon-left.fa-github {
      font-size: 1.5rem;
    }
  }

  &__menu {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    margin-right: 1.5rem;
  }

  &__menu-container {
    display: flex;
    flex-wrap: nowrap;
    height: 1.5rem;
  }

  &__logo {
    width: 9.5rem;
    height: auto;
    align-items: center;

    & * {
      max-height: 100%;
      max-width: 100%;
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  &__actions {
    justify-content: flex-end;
  }

  &__mailto-link:hover {
    filter: brightness(85%);
  }

  &__shape {
    transition: border-top-color 0.3s ease; /* sidebar's bg color transitions as well -> consistency */
    width: 33%;
    max-width: 467px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    border-top: 4.215rem solid transparent; // hardcoded size
    border-left: $nav-border-side-width solid transparent;
    border-right: $nav-border-side-width solid transparent;
    height: 0;
  }

  @include media-breakpoint-down(lg) {
    &__button {
      display: none !important;
    }
  }

  @include media-breakpoint-down(md) {
    &__center {
      display: none !important;
    }
  }

  @include media-breakpoint-down(sm) {
    &__content {
      align-items: flex-end;
    }

    &__actions {
      margin-top: 1.25rem;
      justify-content: space-between;
      width: 100%;
    }

    &__shape {
      display: none;
    }
  }
}

.flash {
  animation: glowing 1500ms infinite;
}

@keyframes glowing {
  0% {
    background-color: #b20000;
    box-shadow: 0 0 3px #220000;
  }

  50% {
    background-color: #ff0000;
    box-shadow: 0 0 40px #ff0000;
  }

  100% {
    background-color: #b20000;
    box-shadow: 0 0 3px #b20000;
  }
}
</style>
