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
    tareas: state => state.tareas,
  },
  modules: {
    app,
  },
  state: {
    token: null,
    user: null,
    puesto: null,
    operarios: [],
    tareas: [],
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
    addTarea(state, tarea) {
      state.tareas.push(tarea)
    },
    removeTarea(state, tarea) {
      state.tareas = state.tareas.filter(x => x.idSql !== tarea.Id)
    },
    removeAllTareas(state) {
      state.tareas = []
    }
  },
  actions: {
    addTarea({ commit }, tarea) {
      commit('addTarea', tarea)
    },
    removeTarea({ commit }, tarea) {
      commit('removeTarea', tarea)
    },
    removeAllTareas({ commit }) {
      commit('removeAllTareas')
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
    }
  },
})

Vue.use(VuexI18n.plugin, store)

export default store
