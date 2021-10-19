// Create Store
export const state = () => ({
    authorized: false
})

// Getters
export const getters = {
    authorized(state)
    {
        return state.authorized
    }
}

// Mutations
export const mutations = {
    SET_AUTHORIZED(state, authorized)
    {
        state.authorized = authorized
    }
}

// Actions
export const actions = {
    setAuthorized({ commit }, authorized)
    {
        commit('SET_AUTHORIZED', authorized)
    }
}