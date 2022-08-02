export default {
  getPermissions: (state) => (userId) => {
    if (!userId || !state.user) {
      return []
    }

    if (state.user.id !== userId) {
      return []
    }

    return Object.values(state[userId])
  }
}
