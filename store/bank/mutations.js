/* eslint-disable camelcase */
import { updateField } from 'vuex-map-fields'

export default {
  SET_BANKS(state, banks) {
    state.banks = banks
  },
  ADD_BANK(state, bank) {
    state.banks.push(bank)
  },
  UPDATE_BANK(state, bank) {
    const index = state.banks.findIndex((item) => item.id === bank.id)
    state.banks[index] = bank
  },
  SET_BANK_FORM(state, bank) {
    state.form = {
      ...bank
    }
  },
  CLEAR_BANK_FORM(state) {
    state.form = {
      bank_name: null,
      primary_phone: null,
      secondary_phone: null,
      email: null,
      website: null,
      logo: null,
      published: true
    }
  },
  REMOVE_BANK(state, id) {
    const index = state.banks.findIndex(function (o) {
      return o.id === id
    })
    if (index !== -1) {
      state.banks.splice(index, 1)
    }
  },
  updateField
}
