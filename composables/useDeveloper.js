import { useStore } from '@nuxtjs/composition-api'

export default function useDeveloper() {
    const store = useStore()
    const findDeveloperIdByName = (name) => {
        if (!name) {
            return null
        }
        const developer = store.getters['developer/getProjectByName'](name)
        if (!developer) {
            return null
        }

        return developer.id
    }

    const fetchDeveloperByDevelopmentType = (developmentTypeId) => {
        store.dispatch(
            'developer/fetchDeveloperByDevelopmentType',
            developmentTypeId
        )
    }

    const developerOfDevelopmentType = (developmentTypeId) => {
        return store.getters['developer/getDeveloperByDevelopmentTypeId'](
            developmentTypeId
        )
    }
    const publishedDevelopers = () => {
        return store.getters['developer/getPublishedDevelopers']
    }

    const allDevelopers = () => {
        return store.getters['developer/getDevelopers']
    }

    return {
        allDevelopers,
        fetchDeveloperByDevelopmentType,
        developerOfDevelopmentType,
        findDeveloperIdByName,
        publishedDevelopers
    }
}
