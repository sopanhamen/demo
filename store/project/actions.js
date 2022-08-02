/* eslint-disable camelcase */
export default {
  async fetchAllProjects({ commit }) {
    const { data } = await this.$service.project.get()
    commit('SET_PROJECTS', data)
  },

  async fetchProjectsByDeveloper({ commit }, developerId) {
    const { data } = await this.$service.project.get({
      developer_id: developerId,
      no_pagination: true
    })
    commit('ADD_PROJECTS', data)
  },

  async storeNewProject({ commit, getters }) {
    const project = getters.getNewProject
    const { data } = await this.$service.project.create(project)
    commit('ADD_PROJECT', data)
  },

  async editProject({ commit }, id) {
    const { data } = await this.$service.project.find(id)
    commit('SET_PROJECT_FORM', data)
    return data
  },

  async updateProject({ commit, getters }) {
    const project = getters.getNewProject
    const { data } = await this.$service.project.update(project.id, project)
    commit('UPDATE_PROJECT', data)
  },

  async deleteProject({ commit, getters }, id) {
    await this.$service.project.delete(id)
    commit('REMOVE_PROJECT', id)
  }
}
