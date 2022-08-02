import { getField } from 'vuex-map-fields'

export default {
  getCompanies: (state) => state.companies,
  getCompanyById: (state) => (id) => {
    return state.companies.find((company) => company.id === id)
  },
  getFormData: (state) => state.form,
  getField
}
