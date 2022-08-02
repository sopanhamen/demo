import { computed, useContext, useStore } from '@nuxtjs/composition-api'

export default function useCompanyBranch() {
  const { $service } = useContext()
  const { getters, commit } = useStore()

  const branchesOfCompany = computed(() => (companyId) => {
    return getters['companyBranch/getBranchesByCompany'](companyId)
  })

  const fetchByCompany = async (companyId) => {
    const { data } = await $service.companyBranch.get({ company_id: companyId })
    if (data) {
      commit('companyBranch/ADD_COMPANY_BRANCHES', data)
    }
  }

  return {
    branchesOfCompany,
    fetchByCompany
  }
}
