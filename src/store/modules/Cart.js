export default {
    namespaced: true,
    
    state: {
        carrito: []
    }, 

    mutations: {
        SET_CART(state, payload) {
            state.carrito = payload
        },
    }, 

    actions: {
        setCart({commit}, payload) {
            commit('SET_CART', payload)
        },
    },

    getters: {
        carrito: (state) => state.carrito,
        cantCarrito: (state) => state.carrito.length,
    }
}