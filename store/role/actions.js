export default {
  async fetchAllRoles({ commit }) {
    const { data } = await this.$service.role.get()
    commit('SET_ROLES', data)
    return data
  },

  async storeNewRole({ commit, getters, state }) {
    const role = getters.getFormData
    const { data } = await this.$service.role.create(role)
    commit('ADD_ROLE', {
      ...data,
      creator: state.auth ? state.auth.user : {}
    })
  },

  async editRole({ commit }, id) {
    const { data } = await this.$service.role.find(id, {
      relations: 'permissions,users'
    })
    commit('SET_ROLE_FORM', data)
    return data
  },

  async updateRole({ commit, getters, state }) {
    const role = getters.getFormData
    const { data } = await this.$service.role.update(role.id, role)
    commit('UPDATE_ROLE', {
      ...data,
      creator: state.auth ? state.auth.user : {}
    })
  },

  async deleteRole({ commit }, id) {
    await this.$service.role.delete(id)
    commit('REMOVE_ROLE', id)
  }
}
