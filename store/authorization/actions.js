export default {
  async fetchPermissions({ commit }, user) {
    const data = await this.$service.auth.getPermissions()
    commit('SET_PERMISSIONS', { user, permissions: data })
    return { user, permissions: data }
  }
}
