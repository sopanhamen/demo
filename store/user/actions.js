export default {
    async fetchUsers({ commit }, params) {
        const { data } = await this.$service.user.get(params)
        commit('SET_USERS', data)
        return data
    },

    async editUser({ commit }, id) {
        const { data } = await this.$service.user.find(id, {
            relations: 'roles,profile,profile.contact,teams'
        })
        commit('SET_USER_FORM', data)
        return data
    },

    async editUserProfile({ commit }, id) {
        const { data } = await this.$service.user.find(id, {
            relations: 'roles,profile,profile.company,teams'
        })
        commit('SET_USER_FORM', data)

        return data
    },

    async storeNewUser({ commit, getters }) {
        const user = getters.getFormData
        const { data } = await this.$service.user.create(user)
        commit('ADD_USER', data)
    },

    async updateUser({ commit, getters }) {
        const user = getters.getFormData
        const { data } = await this.$service.user.update(user.id, user)
        commit('UPDATE_USER', data)
    },

    async deleteUser({ commit, getters }, id) {
        await this.$service.user.delete(id)
        commit('REMOVE_USER', id)
    }
}
