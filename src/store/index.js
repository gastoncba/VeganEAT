import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [], 
    carrito: []
  },
  mutations: {
    SET_PRODUCTS(state, paylaod) {
      state.products = paylaod
    },

    AGREGAR(state, payload) {
      state.carrito.push(payload)
    }
  },
  actions: {
    setProducts({commit}, payload) {
      commit('SET_PRODUCTS', payload) 
    },

    agregar({commit}, payload) {
      commit('AGREGAR',payload)
    }
  },

  getters: {
    products: (state) => state.products,
    cant: (state) => state.products.length,
    carrito: (state) => state.carrito
  },

  modules: {
  }
})
