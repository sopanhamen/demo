/* eslint-disable camelcase */
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
  SET_DEVELOPMENT_TYPES(state, developmentTypes) {
    state.developmentTypes = developmentTypes
  },
  ADD_DEVELOPMENT_TYPE(state, developmentType) {
    state.developmentTypes.push(developmentType)
  },
  UPDATE_DEVELOPMENT_TYPE(state, developmentType) {
    const index = state.developmentTypes.findIndex(
      (i) => i.id === developmentType.id
    )
    state.developmentTypes[index] = developmentType
  },
  SET_DEVELOPMENT_TYPE_FORM(state, developmentType) {
    state.form = {
      ...developmentType
    }
  },
  CLEAR_DEVELOPMENT_TYPE_FORM(state) {
    state.form = {
      ...form
    }
  },
  REMOVE_DEVELOPMENT_TYPE(state, id) {
    const index = state.developmentTypes.findIndex((o) => o.id === id)
    if (index !== -1) {
      state.developmentTypes.splice(index, 1)
    }
  },
  updateField
}
