import { getField } from 'vuex-map-fields'

export default {
    getCompanyBranches: (state) => state.companyBranches,
    getBranchesByCompany: (state) => (companyId) => {
        return state.companyBranches.filter(
            (i) => i.company_id === companyId && i.published === true
        )
    },
    getFormData: (state) => state.form,
    getField
}
