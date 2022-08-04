const endpoint = '/users'

export default {
    async fetchPagination({ commit }, options) {
        const response = await this.$axios.$get(endpoint, options)
        commit('SET_PAGINATION', response)
    },

    async fetchUsers({ commit }, params) {
        const { data } = await this.$service.user.get(params)
        commit('SET_USERS', data)
        return data
    },

    async editUser({ commit }, id) {
        const { data } = await this.$axios.$get(
            `${endpoint}/${id}?relations=roles,profile`
        )
        commit('SET_USER_FORM', data)
        return data
    },

    async editUserProfile({ commit }, id) {
        const { data } = await this.$axios.$get(
            `${endpoint}/${id}?relations=roles,profile,profile.company,profile.team`
        )
        commit('SET_USER_FORM', data)
        return data
    },

    async storeNewUser({ commit, getters }) {
        const user = getters.getFormData
        const { data } = await this.$axios.$post(`${endpoint}`, user)
        commit('ADD_USER', data)
    },
    async updateUser({ commit, getters }) {
        const user = getters.getFormData
        const { data } = await this.$axios.$put(`${endpoint}/${user.id}`, user)
        commit('UPDATE_USER', data)
    },
    async deleteUser({ commit, getters }, id) {
        await this.$axios.$delete(`${endpoint}/${id}`)
        commit('REMOVE_USER', id)
    }
}
