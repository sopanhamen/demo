import { ListingOption } from '@/enums/ListingOption'

/* eslint-disable camelcase */
const date = new Date()
const currentYear = date.getFullYear()
const firstDay = new Date(currentYear, 0, 1)
const lastDay = new Date(date)

export default () => ({
    property_summaries: {
        total_properties: 0,
        total_exclusives: 0,
        total_expired: 0,
        total_expired_value: '0.00',
        total_selling_value: '0.00',
        total_sold_value: '0.00',
        total_renting_value: '0.00',
        total_rented_value: '0.00'
    },
    company_summaries: {},
    client_summaries: {},
    contact_summaries: {},
    property_counts_by_date: [],
    property_counts_by_price_range: [],
    property_counts_by_location: [],
    property_counts_by_developer: [],
    property_counts_by_project: [],
    property_counts_by_property_type_group: [],

    quickIndicator: {
        total_company_branches: null,
        total_teams: null,
        total_agents: null,
        total_agents_in_team: null,

        total_properties: null,
        total_properties_in_team: null,
        total_properties_by_assignee: null,
        avg_post: null,

        total_selling_price: null,
        total_selling_in_branch: null,
        total_selling_in_team: null,
        total_selling_by_assignee: null,

        total_renting_price: null,
        total_renting_in_branch: null,
        total_renting_in_team: null,
        total_renting_by_assignee: null
    },
    viewLikeContact: {
        total_contacts: null,
        total_contacts_to_branch: null,
        total_contacts_to_team: null,
        total_contacts_by_assignee: null
    },
    filters: {
        listing_type_option: ListingOption.ALL,
        date: [firstDay, lastDay],
        user_id: null,
        team_id: null,
        company_branch_id: null,
        company_id: null
    }
})
