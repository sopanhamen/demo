export default {
  async fetchAllFacilities({ commit }) {
    const { data } = await this.$service.facility.get({ no_pagination: true })
    commit('SET_FACILITIES', data)
    return data
  },

  async editFacility({ commit }, id) {
    const { data } = await this.$service.facility.find(id, {
      relations: 'propertyTypes'
    })
    commit('SET_FACILITY_FORM', data)
    return data
  },

  async storeNewFacility({ commit, getters }) {
    const facility = getters.getFormData
    const { data } = await this.$service.facility.create(facility)

    commit('ADD_FACILITY', data)

    return data
  },

  async updateFacility({ commit, getters }) {
    const facility = getters.getFormData
    const { data } = await this.$service.facility.update(facility.id, facility)
    commit('UPDATE_FACILITY', data)
  },

  async deleteFacility({ commit }, id) {
    await this.$service.facility.delete(id)
    commit('REMOVE_FACILITY', id)
  }
}
