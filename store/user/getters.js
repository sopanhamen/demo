import { getField } from 'vuex-map-fields'

export default {
    getUsers: (state) => state.users,
    getUsersByTeam: (state) => (teamId) => {
        if (!teamId) {
            return []
        }

        return state.users.filter((user) => user.teams.includes(teamId))
    },
    getFormData: (state) => state.form,
    getField
}
