/* eslint-disable camelcase */
export const client = {
  label: 'Client',
  profile: 'Client Profile',
  search_client: 'Search Client',
  title: {
    list: 'Client List',
    new: 'New Client',
    edit: 'Edit Client',
    client_detail: 'Client Detail',
    new_requirement: 'New Client Requirement',
    requirement_list: 'Client Requirement List',
    edit_requirement: 'Edit Client Requirement',
    detail_requirement: 'Requirement Detail',
    myClientOnly: 'My Client Only'
  },
  button: {
    list: 'Client List',
    new: 'New Client',
    edit: 'Edit Client'
  },
  model: {
    name: 'Client Name',
    assignee: 'Assign To'
  },
  form: {
    general: 'General Information',
    contact: 'Client Contact Information',
    location: 'Client Location Information',
    requirement: 'Requirement',
    other: 'Other'
  },
  filter: {
    tab_contact_and_status: 'Contact & Status'
  },
  message: {
    no_active_requirements: 'No active requirements',
    success_create: 'New client has been created successfully.',
    success_update: 'The client has been updated successfully.',
    success_delete: 'The client has been deleted successfully.',
    error_create: 'Failed to create a new client.',
    error_update: 'Failed to update client.',
    error_delete: 'Failed to delete client.',
    confirm_cancel_requirement:
      'Do you really want to cancel requirement number {number}?'
  }
}

export const edit_client = {
  edit_client: 'Edit Client',
  type: 'Type',
  prefer: 'Prefer',
  area: 'Area',
  date: 'Date',
  budget: 'Budget',
  client_name: 'Client Name',
  general: 'GENERAL INFORMATION',
  name: 'Name',
  client_group: 'Client Group',
  service_required: 'Service Required',
  purpose: 'Purpose',
  priority: 'Priority',
  source: 'Source',
  requirement: 'REQUIREMENT',
  minimum: 'Minimum Budget',
  maximum: 'Maximum Budget',
  total: 'Total',
  sqm: '/SQM',
  month: '/Month',
  hectares: '/Hectares',
  property_prefer: 'Property Prefer',
  area_prefer: 'AREA PREFER',
  province: 'Province',
  district: 'District',
  commune: 'Commune',
  contact: 'CONTACT',
  phone1: 'Phone 1',
  phone2: 'Phone 2',
  email: 'Email',
  facebook: 'Facebook',
  result_extra: 'RESULT & EXTRA',
  published: 'Published',
  publish: 'Publish',
  un_publish: 'Un-Publish',
  complete: 'Complete Option',
  photo: 'Photo',
  note: 'Note'
}

export const client_type = {
  label: 'Client Type',
  title: 'Client Types',
  new_client_type: 'New Client Type',
  edit_client_type: 'Edit Client Type',
  clients_count: 'Clients Count',
  message: {
    success_create: 'New client type has been created successfully.',
    success_update: 'The client type has been updated successfully.',
    success_delete: 'The client type has been deleted successfully.',
    error_create: 'Failed to create a new client type.',
    error_update: 'Failed to update client type.',
    error_delete: 'Failed to delete client type.'
  }
}

export const requirement = {
  label: 'Requirement(s)',
  title: 'Requirements',
  new_requirement: 'New requirement',
  add_requirement: 'Add Requirement',
  requirement_list: 'Requirement Lists',
  edit_requirement: 'Edit requirement',
  message: {
    success_create: 'New requirement has been created successfully.',
    success_update: 'The requirement has been updated successfully.',
    success_delete: 'The requirement has been deleted successfully.',
    error_create: 'Failed to create a new requirement.',
    error_update: 'Failed to update requirement.',
    error_delete: 'Failed to delete requirement.'
  }
}

export const mail_box = {
  label: 'Mail Box',
  title: 'Mail Box',
  detail: 'Mail Box Detail'
}

export const client_result = {
  in_progress: 'In progress',
  pending: 'Pending',
  failed: 'Failed',
  successful: 'Successful'
}

export const client_source = {
  label: 'Source',
  model: {
    walk_in: 'Walk-In',
    third_party: 'Third Party',
    website: 'Website',
    banner_raising: 'Banner Raising',
    other_advertising: 'Other Advertising',
    facebook: 'Facebook',
    google_map: 'Google Map',
    khmer24: 'Khmer24',
    cvea: 'CVEA',
    realestate_com_kh: 'realestate.com.kh'
  }
}

export const client_payment = {
  label: 'Client Payment',
  title: {
    list: 'Client Payment History',
    property_price: 'Property Price',
    total_paid: 'Total Paid',
    remain: 'Remain'
  },
  model: {
    payment_date: 'Payment Date',
    assignee: 'Assignee',
    amount: 'Amount',
    next_payment_date: 'Next Payment Date',
    note: 'Note'
  },
  message: {
    error_create: ' Payment is failed complete ',
    success_create: 'Payment have been completed successfully',
    payment_is_not_completed: 'Payment is not completed',
    no_agreed_negotiation: 'There is no any agreed at negotiation yet.',
    error_amount_overload: 'Amount is much more than remain amount.'
  }
}

export const client_requirement = {
  label: 'Client Requirement',
  title: {
    detail: 'Client Requirement Detail'
  },
  min_create_date: 'Min Created Date',
  max_create_date: 'Max Created Date',
  model: {
    min_budget: 'Minimum Budget',
    max_budget: 'Maximum Budget',
    preferred_property: 'Prefer',
    service_required: 'Service Required'
  },
  message: {
    success_create: 'New client requirement has been created successfully.',
    success_update: 'The client requirement has been updated successfully.',
    success_delete: 'The client requirement has been deleted successfully.',
    error_create: 'Failed to create a new client requirement.',
    error_update: 'Failed to update client requirement.',
    error_delete: 'Failed to delete client requirement.'
  }
}

export const requirement_service = {
  label: 'Service',
  model: {
    buy: 'Buy',
    sell: 'Sell',
    rent: 'Rent',
    offer_renting: 'Offer Renting',
    valuate: 'Valuating',
    consult: 'Consulting'
  }
}

export const requirement_result = {
  label: 'Result',
  model: {
    in_progress: 'In Progress',
    pending: 'Pending',
    failed: 'Failed',
    success: 'Success',
    cancelled: 'Cancelled'
  }
}
