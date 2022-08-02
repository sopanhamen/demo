import { getField } from 'vuex-map-fields'

export default {
  getPropertySummaries: (state) => state.property_summaries,
  getCompanySummaries: (state) => state.company_summaries,
  getClientSummaries: (state) => state.client_summaries,
  getContactSummaries: (state) => state.contact_summaries,
  getPropertyCountsByLocation: (state) => state.property_counts_by_location,
  getPropertyCountsByDeveloper: (state) => state.property_counts_by_developer,
  getPropertyCountsByProject: (state) => state.property_counts_by_project,
  getPropertyCountsByPropertyTypeGroup: (state) =>
    state.property_counts_by_property_type_group,
  getPropertyCountsByDate: (state) => state.property_counts_by_date,
  getPropertyCountsByPriceRange: (state) =>
    state.property_counts_by_price_range,

  getTotalCompanyBranches: (state) =>
    state.quickIndicator.total_company_branches,
  getTotalTeams: (state) => state.quickIndicator.total_teams,
  getTotalAgents: (state) => state.quickIndicator.total_agents,
  getTotalAgentsInTeam: (state) => state.quickIndicator.total_agents_in_team,

  getTotalProperties: (state) => state.quickIndicator.total_properties,
  getTotalPropertiesInTeam: (state) =>
    state.quickIndicator.total_properties_in_team,
  getTotalPropertiesByAssignee: (state) =>
    state.quickIndicator.total_properties_by_assignee,
  getAvgPost: (state) => state.quickIndicator.avg_post,

  getTotalSellingPrice: (state) => state.quickIndicator.total_selling_price,
  getTotalSellingInBranch: (state) =>
    state.quickIndicator.total_selling_in_branch,
  getTotalSellingInTeam: (state) => state.quickIndicator.total_selling_in_team,
  getTotalSellingByAssignee: (state) =>
    state.quickIndicator.total_selling_by_assignee,
  getTotalRentingPrice: (state) => state.quickIndicator.total_renting_price,
  getTotalRentingInBranch: (state) =>
    state.quickIndicator.total_renting_in_branch,
  getTotalRentingInTeam: (state) => state.quickIndicator.total_renting_in_team,
  getTotalRentingByAssignee: (state) =>
    state.quickIndicator.total_renting_by_assignee,

  getTotalContacts: (state) => state.viewLikeContact.total_contacts,
  getTotalContactsInTeam: (state) =>
    state.viewLikeContact.total_contacts_to_team,
  getTotalContactsInBranch: (state) =>
    state.viewLikeContact.total_contacts_to_branch,
  getTotalContactsByAssignee: (state) =>
    state.viewLikeContact.total_contacts_by_assignee,

  getFormData: (state) => state.form,
  getField
}
