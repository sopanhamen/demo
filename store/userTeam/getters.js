import { getField } from 'vuex-map-fields'

export default {
  getUserTeams: (state) => state.userTeams,
  getTeamsByBranch: (state) => (branch) => {
    return state.userTeams.filter((i) => i.company_branch_id === branch)
  },
  getFormDataUserTeam: (state) => state.form,
  getField
}
