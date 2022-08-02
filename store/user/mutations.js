/* eslint-disable camelcase */
import { updateField } from 'vuex-map-fields'
import { unionBy } from 'lodash'
import { form } from './-default'

export default {
  SET_USERS(state, users) {
    state.users = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }))
  },
  ADD_USER(state, user) {
    if (!user || !user.id) {
      return
    }

    const newUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }

    state.users = unionBy(state.users, [newUser], 'id')
  },
  ADD_USERS(state, users) {
    const newUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }))
    state.users = unionBy(state.users, newUsers, 'id')
  },
  UPDATE_USER(state, user) {
    const index = state.users.findIndex((item) => item.id === user.id)
    state.users[index] = user
  },
  SET_USER_FORM(state, user) {
    state.form = {
      ...user,
      password: null,
      password_confirmation: null,
      roles: user.roles ? user.roles : [],
      profile: {
        ...(user.profile ? user.profile : form.profile),
        contact:
          user.profile && user.profile.contact
            ? user.profile.contact
            : form.profile.contact
      },
      teams: user.teams && user.teams.length > 0 ? user.teams : form.teams
    }
  },
  UPDATE_USER_FORM(state, payload) {
    state.form = {
      ...state.form,
      ...payload
    }
  },
  CLEAR_USER_FORM(state) {
    state.form = { ...form }
  },
  REMOVE_USER(state, id) {
    const index = state.users.findIndex((o) => o.id === id)
    if (index !== -1) {
      state.users.splice(index, 1)
    }
  },
  ClEAR_ALL_DATA(state) {
    state.users = []
    state.form = { ...form }
  },
  updateField
}
