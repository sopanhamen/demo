import { getField } from 'vuex-map-fields'

export default {
    getClientTypes: (state) => state.clientTypes,
    getPublishedClientTypes: (state) => {
        return state.clientTypes.filter((i) => i.published === true)
    },
    getFormData: (state) => state.form,
    getField
}
