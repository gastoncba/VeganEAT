export default {
    namespaced: true,
    
    state: {
        token: null,
        user: null, 
    }, 

    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload
        },

        SET_USER(state, payload) {
            state.user = payload
        },
    }, 

    actions: {
        setToken({commit}, payload) {
            commit('SET_TOKEN', payload)
        }, 
      
          setUser({commit}, payload) {
            commit('SET_USER', payload)
        },
    },

    getters: {
        user: (state) => state.user,
        token: (state) => state.token,
        nickname: (state) => state.user.nickname
    }
}