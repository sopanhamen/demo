import { ref, useContext, useStore } from '@nuxtjs/composition-api'

export default function useProject() {
  const { $service } = useContext()
  const store = useStore()
  const projects = ref([])
  const findProjectIdByName = (name) => {
    if (!name) {
      return null
    }

    const project = store.getters['project/getProjectByName'](name)
    if (!project) {
      return null
    }

    return project.id
  }

  const fetchProjectsByDeveloper = (developerId) => {
    store.dispatch('project/fetchProjectsByDeveloper', developerId)
  }

  const projectsOfDeveloper = (developerId) => {
    return store.getters['project/getProjectsByDeveloperId'](developerId)
  }

  const allProjects = () => {
    return store.getters['project/getProjects']
  }

  const publishedProjects = () => {
    return store.getters['project/getPublishedProjects']
  }

  const searchProject = async (value) => {
    const { data } = await $service.project.search('name', value)

    if (data) {
      projects.value = data

      store.commit('project/ADD_PROJECTS', projects.value)

      return projects.value
    }
  }

  return {
    searchProject,
    allProjects,
    publishedProjects,
    fetchProjectsByDeveloper,
    findProjectIdByName,
    projectsOfDeveloper
  }
}
