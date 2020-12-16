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
    hayPuesto: state => state.puesto != null,
    puesto: state => state.puesto,
    hayOperarios: state => state.operarios.length > 0,
    operarios: state => state.operarios,
    tarea: state => state.tarea,
    hayTarea: state => state.tarea != null,
    contadorPaquetes: state => state.countPacket,
    editandoCountPacket: state => state.editandoCountPacket,
    editandoTotalPacket: state=> state.editandoTotalPacket,
    operacionSeleccion: state=>state.operacionSeleccion,
  },
  modules: {
    app,
  },
  state: {
    user: null,
    puesto: null,
    operarios: [],
    tarea: null,
    operacionSeleccion: null,
    countPacket: 0,
    editandoCountPacket: false,
    editandoTotalPacket: false,
  },
  mutations: {
    setOperacionSeleccion(state, value){
      state.operacionSeleccion = value
    },
    setEditandoCountPacket(state, value){
      state.editandoCountPacket = value
    },
    setEditandoTotalPacket(state, value){
      state.editandoTotalPacket = value
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
    setOperacionSeleccion({commit},operacion){
      commit('setOperacionSeleccion', operacion)
    },
    setEditandoCountPacket({commit},value){
      commit('setEditandoCountPacket', value)
    },
    setEditandoTotalPacket({commit},value){
      commit('setEditandoTotalPacket', value)
    },
    addPulseTask({commit},pulse){
      commit('addPulseTask', pulse)
    },
    setTask({ commit }, tarea) {
      commit('setTask', tarea)
    },
    removeTask({ commit }) {
      commit('removeTask')
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
