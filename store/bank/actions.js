const endpoint = '/banks'

export default {
  async fetchAllBanks({ commit }) {
    const { data } = await this.$axios.$get(`${endpoint}?no_pagination=true`)
    commit('SET_BANKS', data)
    return data
  },

  async storeNewBank({ commit, getters, state }) {
    const bank = getters.getFormData
    const { data } = await this.$axios.$post(`${endpoint}`, bank)
    commit('ADD_BANK', {
      ...data,
      creator: state.auth ? state.auth.user : {}
    })
  },

  async editBank({ commit }, id) {
    const { data } = await this.$axios.$get(`${endpoint}/${id}`)
    commit('SET_BANK_FORM', data)
    return data
  },

  async updateBank({ commit, getters }) {
    const bank = getters.getFormData
    const { data } = await this.$axios.$put(`${endpoint}/${bank.id}`, bank)
    commit('UPDATE_BANK', data)
  },

  async deleteBank({ commit }, id) {
    await this.$axios.$delete(`${endpoint}/${id}`)
    commit('REMOVE_BANK', id)
  }
}
