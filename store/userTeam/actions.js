export default {
  async fetchAllUserTeams({ commit }) {
    const { data } = await this.$service.team.get({ no_pagination: true })
    commit('ADD_USER_TEAMS', data)
  },

  async newUserTeam({ commit, getters }) {
    const team = getters.getFormDataUserTeam
    const { data } = await this.$service.team.create(team)
    commit('ADD_USER_TEAM', data)
  },

  async editUserTeam({ commit }, id) {
    const { data } = await this.$service.team.find(id, {
      relations: 'users,branch,branch.company'
    })

    const team = {
      ...data,
      company_id: data.branch ? data.branch?.company_id : null,
      users: !data.users
        ? []
        : data.users.map((user) => ({
            user_id: user.id,
            level: user.pivot.level
          }))
    }

    commit('user/ADD_USERS', data.users, { root: true })
    commit('SET_USER_TEAM_FORM', team)

    return data
  },

  async updateUserTeam({ commit, state }) {
    const team = state.form
    const { data } = await this.$service.team.update(team.id, team)
    commit('UPDATE_USER_TEAM', data)

    return data
  },

  async deleteUserTeam({ commit }, id) {
    await this.$service.team.delete(id)
    commit('REMOVE_USER_TEAM', id)
  }
}
