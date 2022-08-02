import { getField } from 'vuex-map-fields'

export default {
  getCommunesByDistrict: (state) => (district) => {
    if (!district) {
      return []
    }

    return state.communes.filter((commune) => {
      return district.includes(commune.district_id)
    })
  },
  getCommuneById: (state) => (id) => {
    return state.communes.find((commune) => commune.id === id)
  },
  getCommuneByName: (state) => (name, districtId) => {
    return state.communes.find(
      (c) => c.name_en === name && c.district_id === districtId
    )
  },
  getCommunes: (state) => state.communes,
  getFormDataCommune: (state) => state.form,
  getField
}
