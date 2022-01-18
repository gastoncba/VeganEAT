import Vue from 'vue'
import Vuex from 'vuex'
import carrito from '../store/modules/Cart'
import usuario from '../store/modules/User'
import orden from '../store/modules/Order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],  
  },

  mutations: {
    SET_PRODUCTS(state, paylaod) {
      state.products = paylaod
    },
  },

  actions: {
    setProducts({commit}, payload) {
      commit('SET_PRODUCTS', payload) 
    },
  },

  getters: {
    products: (state) => state.products,
    cantProducts: (state) => state.products.length
  },

  modules: {
    carrito, usuario, orden
  }
})
