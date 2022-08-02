import { getField } from 'vuex-map-fields'

export default {
  getPropertyTypes: (state) => state.propertyTypes,
  getPropertyTypeById: (state) => (propertyTypeId) => {
    return state.propertyTypes.find((item) => item.id === propertyTypeId)
  },
  getPropertyTypeByName: (state) => (propertyTypeName) => {
    return state.propertyTypes.find(
      (item) => item.name.toLowerCase() === propertyTypeName.toLowerCase()
    )
  },
  getFacilities: (state) => (propertyTypeId) => {
    const propertyType = state.propertyTypes.find(
      (item) => item.id === propertyTypeId
    )

    if (propertyType) {
      return propertyType.facilities
    }

    return []
  },
  getFormData: (state) => state.form,
  getField
}
