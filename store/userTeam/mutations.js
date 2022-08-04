import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
    SET_USER_TEAMS(state, userTeams) {
        state.userTeams = userTeams
    },

    ADD_USER_TEAMS(state, userTeams) {
        state.userTeams = unionBy(state.userTeams, userTeams, 'id')
    },

    ADD_USER_TEAM(state, userTeam) {
        state.userTeams.push(userTeam)
    },

    ADD_TEAM_USER_TO_FORM(state, user) {
        if (state.form.users) {
            state.form.users.push(user)
        } else {
            state.form.users = [user]
        }
    },

    UPDATE_USER_TEAM(state, userTeam) {
        const index = state.userTeams.findIndex(
            (item) => item.id === userTeam.id
        )
        state.userTeams[index] = userTeam
    },
    SET_USER_TEAM_FORM(state, userTeam) {
        state.form = {
            ...userTeam
        }
    },
    UPDATE_USER_TEAM_FORM(state, payload) {
        state.form = {
            ...state.form,
            ...payload
        }
    },
    CLEAR_USER_TEAM_FORM(state, keepFields) {
        state.form = {
            ...form,
            ...keepFields
        }
    },
    REMOVE_USER_TEAM(state, id) {
        const index = state.userTeams.findIndex((i) => i.id === id)
        if (index !== -1) {
            state.userTeams.splice(index, 1)
        }
    },
    ClEAR_ALL_DATA(state) {
        state.userTeams = []
        state.form = { ...form }
    },
    updateField
}
