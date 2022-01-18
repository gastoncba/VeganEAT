export default {
    namespaced: true,
    
    state: {
        order: null
    }, 

    mutations: {
        SET_ORDER(state, payload) {
            state.order = payload
        }
    }, 

    actions: {
        setOrder({commit}, payload) {
            commit('SET_ORDER', payload)
        }
    },

    getters: {
        order: (state) => state.order
    }
}