export default {
    async fetchAllProvinces({ commit }) {
        const { data } = await this.$service.province.get()
        commit('SET_PROVINCES', data)

        return data
    },

    async fetchAllProvincesByCountry({ commit }, countryId) {
        const { data } = await this.$service.province.get({
            country_id: countryId
        })
        commit('ADD_PROVINCES', data)

        return data
    },

    async storeNewProvince({ commit, getters }) {
        const province = getters.getNewProvince
        const { data } = await this.$service.province.create(province)
        commit('ADD_PROVINCE', data)

        return data
    },

    async editProvince({ commit }, id) {
        const { data } = await this.$service.province.find(id)
        commit('SET_PROVINCE_FORM', data)

        return data
    },

    async updateProvince({ commit, getters }) {
        const province = getters.getNewProvince
        const { data } = await this.$service.province.update(
            province.id,
            province
        )
        commit('UPDATE_PROVINCE', data)

        return data
    },

    async deleteProvince({ commit }, id) {
        const { data } = await this.$service.province.delete(id)
        commit('REMOVE_PROVINCE', id)

        return data
    },

    clearProvince({ commit }) {
        commit('SET_PROVINCES', [])
    }
}
