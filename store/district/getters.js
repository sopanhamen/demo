import { getField } from 'vuex-map-fields'

export default {
  getDistricts: (state) => state.districts,
  getDistrictsByProvince: (state) => (province) => {
    if (!province) {
      return []
    }

    return state.districts.filter((district) => {
      return province.includes(district.province_id)
    })
  },
  getDistrictById: (state) => (id) => {
    return state.districts.find((district) => district.id === id)
  },
  getDistrictByName: (state) => (name, districtId) => {
    return state.districts.find(
      (d) => d.name_en === name && d.province_id === districtId
    )
  },
  getNewDistrict: (state) => state.form,
  getField
}
