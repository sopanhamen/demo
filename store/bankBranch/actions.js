const endpoint = '/banks/branches'

export default {
  async fetchAllBankBranches({ commit }) {
    const { data } = await this.$axios.$get(`${endpoint}?no_pagination=true`)
    commit('SET_BANK_BRANCHES', data)
  },

  async editBankBranch({ commit }, id) {
    const { data } = await this.$axios.$get(`${endpoint}/${id}`)
    commit('SET_BANK_BRANCH_FORM', data)
    return data
  },

  async storeNewBranch({ commit, getters }) {
    const bankBranch = getters.getFormData
    const { data } = await this.$axios.$post(`${endpoint}`, bankBranch)
    commit('ADD_BANK_BRANCH', data)
  },
  async updateBankBranch({ commit, getters }) {
    const bankBranch = getters.getFormData
    const { data } = await this.$axios.$put(
      `${endpoint}/${bankBranch.id}`,
      bankBranch
    )
    commit('UPDATE_BANK_BRANCH', data)
  },
  async deleteBankBranch({ commit, getters }, id) {
    await this.$axios.$delete(`${endpoint}/${id}`)
    commit('REMOVE_BANK_BRANCH', id)
  }
}
