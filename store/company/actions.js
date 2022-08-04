export default {
    async fetchAllCompanies({ commit }) {
        const { data } = await this.$service.company.get({
            no_pagination: true,
            relations: 'branches,branches.teams'
        })
        commit('SET_COMPANIES', data)
        return data
    },

    async editCompany({ commit }, id) {
        const { data } = await this.$service.company.find(id)
        commit('SET_COMPANY_FORM', data)
        return data
    },

    async storeNewCompany({ commit, getters }) {
        const company = getters.getFormData
        const { data } = await this.$service.company.create(company)
        commit('ADD_COMPANY', data)
    },
    async updateCompany({ commit, getters }) {
        const Company = getters.getFormData
        const { data } = await this.$service.company.update(Company.id, Company)
        commit('UPDATE_COMPANY', data)
    },
    async deleteCompany({ commit, getters }, id) {
        await this.$service.company.delete(id)
        commit('REMOVE_COMPANY', id)
    }
}
