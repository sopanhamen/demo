export default {
    SET_PERMISSIONS(state, { user, permissions }) {
        ;(state.user = user), (state.permissions = permissions)
    },
    CLEAR_PERMISSION(state) {
        ;(state.user = null), (state.permissions = [])
    }
}
