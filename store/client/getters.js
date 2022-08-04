import { getField } from 'vuex-map-fields'

export default {
    getClients: (state) => state.clients,
    getFormData: (state) => state.form,
    getFormDataRequirement: (state) => state.formRequirement,
    getField
}
