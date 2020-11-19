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
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import mqtt from 'mqtt'
var clientPulso = mqtt.connect('ws://localhost:8883')
clientPulso.callbacks = {}
clientPulso.on('connect', () => {
  console.log('MQTT PULSOS CONECTADO')
  clientPulso.subscribe('/puesto/pulso', (err) => {
    if (err) {
      console.log(err)
    }
  })
})
clientPulso.on('message', async (topic, message) => {
  if (clientPulso.callbacks[topic]) {
    await clientPulso.callbacks[topic](String(message))
  }
})
var client = mqtt.connect('ws://192.168.0.104:8883');
client.callbacks = {}
client.on('connect', () => {
  console.log('MQTT PUESTO CONECTADO')
  client.subscribe('/puestos/+/login', (err) => {
    if (err) {
      console.log(err)
    }
  })
  client.subscribe('/puestos/+/logout', (err) => {
    if (err) {
      console.log(err)
    }
  })
  client.subscribe('/puestos/+/programacion', (err) => {
    if (err) {
      console.log(err)
    }
  })
})
client.on('message', async (topic, message) => {
  if (client.callbacks[topic]) {
    await client.callbacks[topic](String(message))
  }
})
Vue.prototype.$mqtt = client
Vue.prototype.$mqttPulso = clientPulso

Vue.use(VueTabs)
Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)
Vue.use(VueClipboard)
Vue.use(VueSweetalert2);

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
