/* eslint-disable camelcase */
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

const findPropertyIndex = (state, id) => {
  return state.properties.findIndex(function (o) {
    return o.id === id
  })
}

export default {
  SET_PROPERTIES(state, properties) {
    state.properties = properties
  },
  ADD_PROPERTY(state, property) {
    state.properties.push(property)
  },
  UPDATE_PROPERTY(state, property) {
    const index = state.properties.findIndex((item) => item.id === property.id)
    state.properties[index] = property
  },
  SET_PROPERTY_FORM(state, property) {
    state.form = {
      ...state.form,
      ...property
    }
  },
  SET_SELECTED_PROPERTY(state, property) {
    state.selectedProperty = property
  },
  CLEAR_PROPERTY_FORM(state, keepFields) {
    state.form = { ...form, ...keepFields }
  },
  REMOVE_PROPERTY(state, id) {
    const index = findPropertyIndex(state, id)
    if (index !== -1) {
      state.properties.splice(index, 1)
    }
  },
  REMOVE_PROPERTY_FORM_IMAGE(state, image) {
    const index = state.form.images.findIndex(function (o) {
      return image.id ? o.id === image.id : o.path === image.path
    })

    if (index !== -1) {
      state.form.images.splice(index, 1)
    }
  },
  REMOVE_PROPERTY_FORM_DOCUMENT(state, file) {
    const index = state.form.documents.findIndex(function (o) {
      return o.id === file ? o.id === file.id : o.path === file.path
    })

    if (index !== -1) {
      state.form.documents.splice(index, 1)
    }
  },
  ClEAR_ALL_DATA(state) {
    state.form = { ...form }
  },
  updateField
}
