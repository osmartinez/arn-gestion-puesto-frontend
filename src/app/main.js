// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { ColorThemePlugin } from '../services/vuestic-ui'
import store from '../store/index'
import router from '../router/index'
import { VuesticPlugin } from '../services/vuestic-ui/components'
import '../i18n/index'
import YmapPlugin from 'vue-yandex-maps'
import VueClipboard from 'vue-clipboard2'
import NProgress from 'nprogress'
import '../metrics'
import '../registerServiceWorker'
import '../../node_modules/nprogress/nprogress.css'

Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)
Vue.use(ColorThemePlugin, {
  // override colors here.
})

// bibliotecas genericas de JS

//
router.beforeEach((to, from, next) => {
  NProgress.set(0.1)
  NProgress.start()
  return next()
})

router.afterEach(() => {
  store.commit('setLoading', false)
  setTimeout(() => NProgress.done(), 500)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})