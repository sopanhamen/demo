const endpoint = '/resources'

export default {
  async fetchAllResources({ commit }) {
    const data = await this.$axios.$get(`${endpoint}`)
    commit('SET_RESOURCES', data)
    return data
  },
  async fetchStaticResources({ commit }) {
    const data = await this.$axios.$get(`${endpoint}/statics`)
    commit('SET_RESOURCES', data)
    return data
  },
  async fetchDynamicResources({ commit }, resources) {
    const data = await this.$axios.$get(`${endpoint}/dynamics`, {
      params: { resources }
    })

    if (data.countries) {
      commit('country/SET_COUNTRIES', data.countries, { root: true })
    }

    if (data.provinces) {
      commit('province/SET_PROVINCES', data.provinces, { root: true })
    }

    if (data.districts) {
      commit('district/SET_DISTRICTS', data.districts, { root: true })
    }

    if (data.communes) {
      commit('commune/SET_COMMUNES', data.communes, { root: true })
    }

    if (data.client_types) {
      commit('clientType/SET_CLIENT_TYPES', data.client_types, { root: true })
    }

    if (data.property_types) {
      commit('propertyType/SET_PROPERTY_TYPES', data.property_types, {
        root: true
      })
    }

    if (data.developers) {
      commit('developer/SET_DEVELOPERS', data.developers, {
        root: true
      })
    }

    if (data.development_types) {
      commit('developmentType/SET_DEVELOPMENT_TYPES', data.development_types, {
        root: true
      })
    }

    if (data.facilities) {
      commit('facility/SET_FACILITIES', data.facilities, {
        root: true
      })
    }

    if (data.companies) {
      commit('company/SET_COMPANIES', data.companies, {
        root: true
      })
    }

    if (data.company_branches) {
      commit('companyBranch/SET_COMPANY_BRANCHES', data.company_branches, {
        root: true
      })
    }

    return data
  }
}
