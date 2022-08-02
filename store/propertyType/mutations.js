/* eslint-disable camelcase */
import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
  SET_PROPERTY_TYPES(state, propertyTypes) {
    state.propertyTypes = propertyTypes
  },
  ADD_PROPERTY_TYPES(state, propertyTypes) {
    state.propertyTypes = unionBy(state.propertyTypes, propertyTypes, 'id')
  },
  SET_PROPERTY_TYPE_FORM(state, propertyType) {
    state.form = { ...propertyType }
  },
  SET_PROPERTY_TYPES_FACILITIES(state, facility_id) {
    state.facility_id = facility_id
  },
  CLEAR_PROPERTY_TYPE_FORM(state) {
    state.form = {
      ...form
    }
  },
  ADD_PROPERTY_TYPE(state, propertyType) {
    state.propertyTypes.push(propertyType)
  },
  UPDATE_PROPERTY_TYPE(state, propertyType) {
    const index = state.propertyTypes.findIndex((i) => i.id === propertyType.id)
    state.propertyTypes[index] = propertyType
  },
  REMOVE_PROPERTY_TYPE(state, id) {
    const index = state.propertyTypes.findIndex((i) => i.id === id)
    if (index !== -1) {
      state.propertyTypes.splice(index, 1)
    }
  },
  updateField
}
