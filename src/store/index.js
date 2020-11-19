import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({

  strict: true, // process.env.NODE_ENV !== 'production',
  getters: {
    config: state => state.app.config,
    palette: state => state.app.config.palette,
    isLoading: state => state.app.isLoading,
    isAuthenticated: state => !!state.token,
    hayPuesto: state => state.puesto != null,
    puesto: state => state.puesto,
    hayOperarios: state => state.operarios.length > 0,
    operarios: state => state.operarios,
    tarea: state => state.tarea,
    hayTarea: state => state.tarea != null,
    contadorPaquetes: state => state.countPacket,
  },
  modules: {
    app,
  },
  state: {
    token: null,
    user: null,
    puesto: null,
    operarios: [],
    tarea: null,
    countPacket: 0,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    setPuesto(state, puesto) {
      state.puesto = puesto
    },
    setOperarios(state, operarios) {
      state.operarios = operarios
    },
    removeToken(state) {
      state.token = null
      state.user = null
    },
    setTask(state, tarea) {
      state.tarea = tarea
    },
    removeTask(state) {
      state.tarea = null
    },
    addPulseTask(state,pulse){
      state.tarea.cantidadFabricadaPuesto.push(pulse);
    },
    setCountPacket(state, cantidad){
      state.countPacket = cantidad
    }
  },
  actions: {
    addPulseTask({commit},pulse){
      commit('addPulseTask', pulse)
    },
    setTask({ commit }, tarea) {
      commit('setTask', tarea)
    },
    removeTask({ commit }) {
      commit('removeTask')
    },
    setToken({ commit }, token) {
      commit('setToken', token)
    },
    setUser({ commit }, user) {
      commit('setUser', user)
    },
    setPuesto({ commit }, puesto) {
      commit('setPuesto', puesto)
    },
    removeToken({ commit }) {
      commit('removeToken')
    },
    setOperarios({ commit }, operarios) {
      commit('setOperarios', operarios)
    },
    setCountPacket({commit},cantidad){
      commit('setCountPacket', cantidad)
    }
  },
})

Vue.use(VuexI18n.plugin, store)

export default store
