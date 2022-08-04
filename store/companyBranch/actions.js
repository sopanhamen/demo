export default {
    async fetchPagination({ commit }, options) {
        const response = await this.$service.companyBranch.paginate(options)
        commit('SET_PAGINATION', response)
        return response
    },

    async fetchAllBranches({ commit }, options) {
        const { data } = await this.$service.companyBranch.get()
        commit('ADD_COMPANY_BRANCHES', data)
        return data
    },

    async editCompanyBranch({ commit }, id) {
        const { data } = await this.$service.companyBranch.find(id)
        commit('SET_COMPANY_BRANCH_FORM', data)
        return data
    },

    async storeNewCompanyBranch({ commit, getters }) {
        const company = getters.getFormData
        const { data } = await this.$service.companyBranch.create(company)
        commit('ADD_COMPANY_BRANCHES', [data])
    },

    async updateCompanyBranch({ commit, getters }) {
        const company = getters.getFormData
        const { data } = await this.$service.companyBranch.update(
            company.id,
            company
        )
        commit('UPDATE_COMPANY_BRANCH', data)
    },

    async deleteCompanyBranch({ commit }, id) {
        await this.$service.companyBranch.delete(id)
        commit('REMOVE_COMPANY_BRANCH', id)
    }
}
