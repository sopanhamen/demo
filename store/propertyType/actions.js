export default {
  async fetchAllPropertyTypes({ commit }) {
    const { data } = await this.$service.propertyType.get({
      relations: 'facilities',
      limit: 200
    })
    commit('SET_PROPERTY_TYPES', data)
  },

  async editPropertyType({ commit }, id) {
    const { data } = await this.$service.propertyType.find(id, {
      relations: 'facilities'
    })
    const propertyType = {
      ...data,
      facilities: data.facilities ? data.facilities.map((i) => i.id) : []
    }

    commit('SET_PROPERTY_TYPE_FORM', { ...propertyType })

    return propertyType
  },

  async storeNewPropertyType({ commit, getters }) {
    const propertyType = getters.getFormData
    const { data } = await this.$service.propertyType.create(propertyType)
    commit('ADD_PROPERTY_TYPE', data)
    return data
  },
  async updatePropertyType({ commit, getters }) {
    const propertyType = getters.getFormData
    const { data } = await this.$service.propertyType.update(
      propertyType.id,
      propertyType
    )
    commit('UPDATE_PROPERTY_TYPE', data)
  },
  async deletePropertyType({ commit, getters }, id) {
    const data = await this.$service.propertyType.delete(id)
    if (data !== false) {
      commit('REMOVE_PROPERTY_TYPE', id)
    }

    return data
  }
}
