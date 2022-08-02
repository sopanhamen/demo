export default {
  async fetchAllCommunes({ commit }) {
    const { data } = await this.$service.commune.get({ limit: 5000 })
    commit('SET_COMMUNES', data)

    return data
  },

  async fetchAllCommunesByDistrict({ commit }, districtId) {
    const { data } = await this.$service.commune.get({
      district_id: districtId
    })
    commit('SET_COMMUNES', data)

    return data
  },

  async storeNewCommune({ commit, getters }) {
    const commune = getters.getFormDataCommune
    const { data } = await this.$service.commune.create(commune)
    commit('ADD_COMMUNE', data)

    return data
  },

  async editCommune({ commit }, id) {
    const { data } = await this.$service.commune.find(id, {
      relations: 'district,district.province,district.province.country'
    })
    commit('SET_COMMUNE_FORM', data)
    return data
  },

  async updateCommune({ commit, getters }) {
    const commune = getters.getFormDataCommune
    const { data } = await this.$service.commune.update(commune.id, commune)
    commit('UPDATE_COMMUNE', data)

    return data
  },

  async deleteCommune({ commit }, id) {
    const { data } = await this.$service.commune.delete(id)
    commit('REMOVE_COMMUNE', id)

    return data
  },
  clearCommunes({ commit }) {
    commit('SET_COMMUNES', [])
  }
}
