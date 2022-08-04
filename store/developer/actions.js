export default {
    async fetchAllDevelopers({ commit }) {
        const { data } = await this.$service.developer.get({
            sorts: 'name:asc'
        })
        commit('SET_DEVELOPERS', data)

        return data
    },

    async fetchDeveloperByDevelopmentType({ commit }, developmentTypeId) {
        const { data } = await this.$service.developer.get({
            development_type_id: developmentTypeId,
            no_pagination: true
        })
        commit('ADD_DEVELOPERS', data)
    },

    async editDeveloper({ commit }, id) {
        const { data } = await this.$service.developer.find(id)
        commit('SET_DEVELOPER_FORM', data)

        return data
    },

    async storeNewDeveloper({ commit, getters }) {
        const developer = getters.getFormData
        const { data } = await this.$service.developer.create(developer)
        commit('ADD_DEVELOPER', data)

        return data
    },
    async updateDeveloper({ commit, getters }) {
        const developer = getters.getFormData
        const { data } = await this.$service.developer.update(
            developer.id,
            developer
        )
        commit('UPDATE_DEVELOPER', data)

        return data
    },
    async deleteDeveloper({ commit }, id) {
        const { data } = await this.$service.developer.delete(id)
        commit('REMOVE_DEVELOPER', id)

        return data
    }
}
