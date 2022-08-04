import { computed, useContext, useStore } from '@nuxtjs/composition-api'

export default function useTeam() {
    const { $service } = useContext()
    const { getters, commit } = useStore()

    const teamsOfBranch = computed(() => (branchId) => {
        return getters['userTeam/getTeamsByBranch'](branchId)
    })

    const fetchByBranch = async (branchId) => {
        const { data } = await $service.team.get({
            company_branch_id: branchId
        })
        if (data) {
            commit('userTeam/SET_USER_TEAMS', data)
        }
    }

    return {
        teamsOfBranch,
        fetchByBranch
    }
}
