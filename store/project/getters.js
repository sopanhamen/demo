import { getField } from 'vuex-map-fields'

export default {
  getProjectsByDeveloper: (state) => (developer) => {
    if (!developer) {
      return []
    }

    return state.projects.filter((project) => {
      return developer.includes(project.developer_id)
    })
  },
  getProjectsByDeveloperId: (state) => (developerId) => {
    if (!developerId) {
      return []
    }

    return state.projects.filter((project) => {
      return project.developer_id === developerId && project.published === true
    })
  },

  getProjects: (state) => state.projects,
  getPublishedProjects: (state) => {
    return state.projects.filter((i) => i.published)
  },
  getNewProject: (state) => state.form,
  getProjectById: (state) => (id) => {
    return state.projects.find((project) => project.id === id)
  },
  getProjectByName: (state) => (name) => {
    return state.projects.find((project) => project.name === name)
  },
  getField
}
