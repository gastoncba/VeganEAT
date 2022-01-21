export default {
    namespaced: true,
    
    state: {
        carrito: [],
        stateCart: true,
    }, 

    mutations: {
        SET_CART(state, payload) {
            state.carrito = payload
        },

        SET_STATE_CART(state, payload) {
            state.stateCart = payload
        }
    }, 

    actions: {
        setCart({commit}, payload) {
            commit('SET_CART', payload)
        },

        setStateCart({commit}, payload) {
            commit('SET_STATE_CART', payload)
        }
    },

    getters: {
        carrito: (state) => state.carrito,
        cantCarrito: (state) => state.carrito.length,
        total: (state) => {
            const total = state.carrito.reduce((sumaTotal, prod) => {
                return (prod.cant*prod.price) + sumaTotal
            }, 0)
            return total
        },
        prodPorCantidad: (state) => {
            const cantProd = state.carrito.reduce((sumaTotal, prod) => {
                return prod.cant + sumaTotal
            }, 0)
            return cantProd
        },
        stateCart: (state) => state.stateCart
    }
}