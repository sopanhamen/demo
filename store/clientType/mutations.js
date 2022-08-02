/* eslint-disable camelcase */
import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
  SET_CLIENT_TYPES(state, clientTypes) {
    state.clientTypes = clientTypes
  },
  ADD_CLIENT_TYPES(state, clientTypes) {
    state.clientTypes = unionBy(state.clientTypes, clientTypes, 'id')
  },
  ADD_CLIENT_TYPE(state, clientType) {
    state.clientTypes.push(clientType)
  },
  UPDATE_CLIENT_TYPE(state, clientType) {
    const index = state.clientTypes.findIndex((i) => i.id === clientType.id)
    state.clientTypes[index] = clientType
  },
  SET_CLIENT_TYPE_FORM(state, clientType) {
    state.form = {
      ...clientType
    }
  },
  CLEAR_CLIENT_TYPE_FORM(state) {
    state.form = {
      ...form
    }
  },
  REMOVE_CLIENT_TYPE(state, id) {
    const index = state.clientTypes.findIndex(function (o) {
      return o.id === id
    })
    if (index !== -1) {
      state.clientTypes.splice(index, 1)
    }
  },
  updateField
}
