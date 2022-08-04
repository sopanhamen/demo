/* eslint-disable camelcase */
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
    SET_ROLES(state, roles) {
        state.roles = roles
    },
    ADD_ROLE(state, role) {
        state.roles.push(role)
    },
    UPDATE_ROLE(state, role) {
        const index = state.roles.findIndex((item) => item.id === role.id)
        state.roles[index] = role
    },
    SET_ROLE_FORM(state, role) {
        state.form = {
            ...role
        }
    },
    SET_ROLE_PERMISSIONS(state, permissions) {
        state.form.permissions = { ...permissions }
    },
    CLEAR_ROLE_FORM(state) {
        state.form = { ...form }
    },
    REMOVE_ROLE(state, id) {
        const index = state.roles.findIndex((o) => o.id === id)
        if (index !== -1) {
            state.roles.splice(index, 1)
        }
    },
    updateField
}
