export default {
  async fetchAllCountries({ commit }) {
    const { data } = await this.$service.country.get()
    commit('SET_COUNTRIES', data)

    return data
  },

  async createCountry({ commit, getters }) {
    const country = getters.getNewCountry
    const { data } = await this.$service.country.create(country)
    commit('ADD_COUNTRY', data)

    return data
  },

  async editCountry({ commit }, id) {
    const { data } = await this.$service.country.find(id)
    commit('SET_COUNTRY_FORM', data)

    return data
  },

  async updateCountry({ commit, getters }) {
    const country = getters.getNewCountry
    const { data } = await this.$service.country.update(country.id, country)
    commit('UPDATE_COUNTRY', data)

    return data
  },

  async deleteCountry({ commit }, id) {
    const { data } = await this.$service.country.delete(id)
    commit('REMOVE_COUNTRY', id)

    return data
  }
}
