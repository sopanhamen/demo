/* eslint-disable camelcase */
import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'

export default {
  SET_FACILITIES(state, facilities) {
    state.facilities = facilities
  },
  ADD_FACILITIES(state, facilities) {
    state.facilities = unionBy(state.facilities, facilities, 'id')
  },
  ADD_FACILITY(state, facility) {
    state.facilities.push(facility)
  },
  UPDATE_FACILITY(state, facility) {
    const index = state.facilities.findIndex((item) => item.id === facility.id)
    state.facilities[index] = facility
  },
  SET_FACILITY_FORM(state, facility) {
    state.form = {
      ...facility
    }
  },
  CLEAR_FACILITY_FORM(state) {
    state.form = {
      code: null,
      name: null,
      published: true
    }
  },
  REMOVE_FACILITY(state, id) {
    const index = state.facilities.findIndex((i) => i.id === id)
    if (index !== -1) {
      state.facilities.splice(index, 1)
    }
  },
  updateField
}
