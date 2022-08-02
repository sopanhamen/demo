export default {
  async fetchAllDistricts({ commit }) {
    const { data } = await this.$service.district.get({ limit: 5000 })
    commit('SET_DISTRICTS', data)

    return data
  },

  async fetchAllDistrictsByProvince({ commit }, provinceId) {
    const { data } = await this.$service.district.get({
      province_id: provinceId,
      limit: 200
    })
    commit('ADD_DISTRICTS', data)

    return data
  },

  async storeNewDistrict({ commit, getters }) {
    const { data } = await this.$service.district.create(getters.getNewDistrict)
    commit('ADD_DISTRICT', data)

    return data
  },

  async editDistrict({ commit }, id) {
    const { data } = await this.$service.district.find(id, {
      relations: 'province.country'
    })
    commit('SET_DISTRICT_FORM', data)

    return data
  },

  async updateDistrict({ commit, getters }) {
    const district = getters.getNewDistrict
    const { data } = await this.$service.district.update(district.id, district)
    commit('UPDATE_DISTRICT', data)

    return data
  },

  async deleteDistrict({ commit }, id) {
    const { data } = await this.$service.district.delete(id)
    commit('REMOVE_DISTRICT', id)

    return data
  },

  clearDistricts({ commit }) {
    commit('SET_DISTRICTS', [])
  }
}
