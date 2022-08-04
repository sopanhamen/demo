import { updateField } from 'vuex-map-fields'
import { ListingOption } from '@/enums/ListingOption'

const date = new Date()
const currentYear = date.getFullYear()
const firstDay = new Date(currentYear, 0, 1)
const lastDay = new Date(date)
export default {
    SET_DASHBOARD(state, dashboard) {
        state.property_summaries = dashboard.property_summaries
        state.company_summaries = dashboard.company_summaries
        state.client_summaries = dashboard.client_summaries
        state.contact_summaries = dashboard.contact_summaries
        state.property_counts_by_location =
            dashboard.property_counts_by_location
        state.property_counts_by_developer =
            dashboard.property_counts_by_developer
        state.property_counts_by_project = dashboard.property_counts_by_project
        state.property_counts_by_property_type_group =
            dashboard.property_counts_by_property_type_group
        state.property_counts_by_date = dashboard.property_counts_by_date
        state.property_counts_by_price_range =
            dashboard.property_counts_by_price_range

        // state.viewLikeContact = {
        //   total_contacts: dashboard.total_contacts,
        //   total_contacts_to_team: dashboard.total_contacts_to_team,
        //   total_contacts_to_branch: dashboard.total_contacts_to_branch,
        //   total_contacts_by_assignee: dashboard.total_contacts_by_assignee
        // }

        // state.quickIndicator = {
        //   total_company_branches: dashboard.total_company_branches,
        //   total_teams: dashboard.total_teams,
        //   total_agents: dashboard.total_agents,
        //   total_agents_in_team: dashboard.total_agents_in_team,

        //   total_properties: dashboard.total_properties,
        //   total_properties_in_team: dashboard.total_properties_in_team,
        //   total_properties_by_assignee: dashboard.total_properties_by_assignee,
        //   avg_post: dashboard.avg_post,

        //   total_selling_price: dashboard.total_selling_price,
        //   total_selling_in_branch: dashboard.total_selling_in_branch,
        //   total_selling_in_team: dashboard.total_selling_in_team,
        //   total_selling_by_assignee: dashboard.total_selling_by_assignee,

        //   total_renting_price: dashboard.total_renting_price,
        //   total_renting_in_branch: dashboard.total_renting_in_branch,
        //   total_renting_in_team: dashboard.total_renting_in_team,
        //   total_renting_by_assignee: dashboard.total_renting_by_assignee
        // }

        // state.lineChart = {
        //   data: dashboard.line_chart
        // }
    },
    CLEAR_DASHBOARD_FILTER(state) {
        state.filters = {
            listing_type_option: ListingOption.ALL,
            date: [firstDay, lastDay],
            user_id: null,
            team_id: null,
            company_branch_id: null,
            company_id: null
        }
    },
    updateField
}
