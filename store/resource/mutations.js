/* eslint-disable camelcase */
export default {
  SET_RESOURCES(state, resource) {
    state.items = resource
    state.totalResource = Object.values(resource).length
  },
  CLEAR_RESOURCES(state) {
    state.items = {}
    state.totalResource = 0
  },
  UPDATE_STATUS(state, status) {
    state.status = status
  }
}
