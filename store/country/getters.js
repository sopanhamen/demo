import { getField } from 'vuex-map-fields'

export default {
  getCountries: (state) => state.countries,
  getCountryById: (state) => (id) => {
    return state.countries.find((country) => country.id === id)
  },
  getCountryByName: (state) => (name) => {
    return state.countries.find(
      (country) => country.name.toLowerCase() === name.toLowerCase()
    )
  },
  getNewCountry: (state) => state.form,
  getField
}
