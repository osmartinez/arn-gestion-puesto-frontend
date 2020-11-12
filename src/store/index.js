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
  },
  modules: {
    app,
  },
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    },
    removeToken (state) {
      state.token = null
      state.user = null
    },
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    removeToken ({ commit }) {
      commit('removeToken')
    },
  },
})

Vue.use(VuexI18n.plugin, store)

export default store
