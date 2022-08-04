export default {
    async fetchAllDevelopmentTypes({ commit }) {
        const { data } = await this.$service.developmentType.get()
        commit('SET_DEVELOPMENT_TYPES', data)

        return data
    },

    async editDevelopmentType({ commit }, id) {
        const { data } = await this.$service.developmentType.find(id)
        commit('SET_DEVELOPMENT_TYPE_FORM', data)

        return data
    },

    async storeNewDevelopmentType({ commit, getters }) {
        const developmentType = getters.getFormData
        const { data } = await this.$service.developmentType.create(
            developmentType
        )
        commit('ADD_DEVELOPMENT_TYPE', data)

        return data
    },
    async updateDevelopmentType({ commit, getters }) {
        const developmentType = getters.getFormData
        const { data } = await this.$service.developmentType.update(
            developmentType.id,
            developmentType
        )
        commit('UPDATE_DEVELOPMENT_TYPE', data)

        return data
    },
    async deleteDevelopmentType({ commit, getters }, id) {
        const { data } = await this.$service.developmentType.delete(id)
        commit('REMOVE_DEVELOPMENT_TYPE', id)

        return data
    }
}
