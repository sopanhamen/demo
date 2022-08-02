/* eslint-disable camelcase */
import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { app } from '~/config'

export default {
  SET_COMPANIES(state, companies) {
    state.companies = unionBy(state.companies, companies, 'id')
  },
  ADD_COMPANY(state, company) {
    state.companies.push(company)
  },
  UPDATE_COMPANY(state, company) {
    const index = state.companies.findIndex((i) => i.id === company.id)
    state.companies[index] = company
  },
  SET_COMPANY_FORM(state, company) {
    state.form = {
      ...state.form,
      ...company
    }
  },
  CLEAR_COMPANY_FORM(state) {
    state.form = {
      name: null,
      year_established: null,
      summary: null,
      description: null,
      vision: null,
      mission: null,
      key_value: null,
      address: null,
      primary_phone: null,
      secondary_phone: null,
      email: null,
      facebook: null,
      telegram: null,
      youtube: null,
      linked_in: null,
      instagram: null,
      logo: null,
      lat_lng: null,
      published: false,
      country_id: app.default_country,
      province_id: null,
      district_id: null,
      commune_id: null,
      property_code_prefix: null,
      property_code_digit: null
    }
  },
  REMOVE_COMPANY(state, id) {
    const index = state.companies.findIndex(function (o) {
      return o.id === id
    })
    if (index !== -1) {
      state.companies.splice(index, 1)
    }
  },
  updateField
}
