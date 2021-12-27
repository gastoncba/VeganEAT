import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [], 
    carrito: [],
    token: null,
    user: null
  },
  mutations: {
    SET_PRODUCTS(state, paylaod) {
      state.products = paylaod
    },

    AGREGAR(state, payload) {
      state.carrito = payload
    },

    ELIMINAR(state, payload) {
      state.carrito = payload
    }, 

    SET_TOKEN(state, payload) {
      state.token = payload
    }, 

    SET_USER(state, payload) {
      state.user = payload
    }, 

    SET_CART(state, payload) {
      state.carrito = payload
    }, 

    CARGAR_CARRITO(state, payload) {
      state.carrito = payload
    }
  },
  actions: {
    setProducts({commit}, payload) {
      commit('SET_PRODUCTS', payload) 
    },

    agregar({commit}, payload) {
      commit('AGREGAR',payload)
    },

    eliminar({commit}, payload) {
      commit('ELIMINAR', payload)
    },

    setToken({commit}, payload) {
      commit('SET_TOKEN', payload)
    }, 

    setUser({commit}, payload) {
      commit('SET_USER', payload)
    }, 

    cargarCarrito({commit}, payload) {
      commit('CARGAR_CARRITO', payload)
    }
  },

  getters: {
    products: (state) => state.products,
    cantProducts: (state) => state.products.length,
    carrito: (state) => state.carrito,
    cantCarrito: (state) => state.carrito.length,
    user: (state) => state.user,
    token: (state) => state.token
  },

  modules: {
  }
})
