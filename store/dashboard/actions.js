import { isValid, format } from 'date-fns'

export default {
    async fetchAllDashboard({ state, commit }) {
        try {
            const data = await this.$service.dashboard.get({
                listing_type_option: state.filters.listing_type_option,
                user_id: state.filters.user_id,
                team_id: state.filters.team_id,
                company_branch_id: state.filters.company_branch_id,
                min_date: state.filters.date[0]
                    ? formatDate(state.filters.date[0])
                    : null,
                max_date: state.filters.date[1]
                    ? formatDate(state.filters.date[1])
                    : null
            })
            commit('SET_DASHBOARD', data)

            return data
        } catch (error) {
            console.error(error)
        }
    }
}

function formatDate(value) {
    if (isValid(new Date(value))) {
        return format(new Date(value), 'yyyy-MM-dd')
    }

    return value
}
