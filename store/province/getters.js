import { getField } from 'vuex-map-fields'

export default {
  getProvinces: (state) => state.provinces,
  getProvincesByCountry: (state) => (country) => {
    if (!country) {
      return []
    }

    return state.provinces.filter((province) => {
      return country.includes(province.country_id)
    })
  },
  getProvinceById: (state) => (id) => {
    return state.provinces.find((province) => province.id === id)
  },
  getProvinceByName: (state) => (name, countryId) => {
    return state.provinces.find(
      (p) => p.name_en === name && p.country_id === countryId
    )
  },
  getNewProvince: (state) => state.form,
  getField
}
