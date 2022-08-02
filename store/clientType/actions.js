const endpoint = '/client-types'

export default {
  async fetchPagination({ commit }, options) {
    const response = await this.$service.clientType.paginate(options)
    commit('SET_PAGINATION', response)
  },

  async fetchAllClientTypes({ commit }) {
    const { data } = await this.$axios.$get(`${endpoint}?no_pagination=true`)
    commit('SET_CLIENT_TYPES', data)
  },

  async editClientType({ commit }, id) {
    const { data } = await this.$axios.$get(`${endpoint}/${id}`)
    commit('SET_CLIENT_TYPE_FORM', data)
    return data
  },

  async storeNewClientType({ commit, getters }) {
    const clientType = getters.getFormData
    const { data } = await this.$axios.$post(`${endpoint}`, clientType)
    commit('ADD_CLIENT_TYPE', data)
  },

  async updateClientType({ commit, getters }) {
    const clientType = getters.getFormData
    const { data } = await this.$axios.$put(
      `${endpoint}/${clientType.id}`,
      clientType
    )
    commit('UPDATE_CLIENT_TYPE', data)
  },

  async deleteClientType({ commit, getters }, id) {
    await this.$axios.$delete(`${endpoint}/${id}`)
    commit('REMOVE_CLIENT_TYPE', id)
  }
}
