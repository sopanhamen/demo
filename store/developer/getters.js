import { getField } from 'vuex-map-fields'

export default {
    getDevelopers: (state) => state.developers,
    getDeveloperByDevelopmentTypeId: (state) => (developmentTypeId) => {
        if (!developmentTypeId) {
            return []
        }

        return state.developers.filter((developer) => {
            return (
                developer.development_type_id === developmentTypeId &&
                developer.published === true
            )
        })
    },
    getPublishedDevelopers: (state) => {
        return state.developers.filter((i) => i.published)
    },
    getFormData: (state) => state.form,
    getField
}
