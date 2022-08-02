/* eslint-disable camelcase */
import { updateField } from 'vuex-map-fields'
import { form, formRequirement } from './-default'

export default {
  SET_CLIENTS(state, clients) {
    state.clients = clients
  },
  ADD_CLIENT(state, client) {
    state.clients.push(client)
  },
  ADD_CLIENT_REQUIREMENT(state, client) {
    // state.clients.push(client)
  },
  UPDATE_CLIENT(state, client) {
    const index = state.clients.findIndex((item) => item.uuid === client.uuid)
    state.clients[index] = client
  },
  SET_CLIENT_FORM(state, client) {
    state.form = {
      ...state.form,
      ...client
    }
  },
  CLEAR_CLIENT_FORM(state, keepFields) {
    state.form = { ...form, ...keepFields }
    state.formRequirement = { ...formRequirement }
  },
  REMOVE_CLIENT(state, uuid) {
    const index = state.clients.findIndex((o) => o.uuid === uuid)
    if (index !== -1) {
      state.clients.splice(index, 1)
    }
  },
  SET_CLIENT_REQUIREMENT_FORM(state, client) {
    state.formRequirement = {
      ...state.formRequirement,
      ...client
    }
  },
  UPDATE_CLIENT_REQUIREMENT(state, requirement) {
    const index = state.requirements.findIndex((i) => i.id === requirement.id)
    state.requirements[index] = requirement
  },
  updateField
}
