export const Permission = Object.freeze({
  /** Dashboard */
  VIEW_COMPANY_DASHBOARD: 'view_company_dashboard',
  VIEW_BRANCH_DASHBOARD: 'view_branch_dashboard',
  VIEW_TEAM_DASHBOARD: 'view_team_dashboard',

  /** Client Type module permissions */
  VIEW_CLIENT_TYPE: 'view_client_type',
  CREATE_CLIENT_TYPE: 'create_client_type',
  UPDATE_CLIENT_TYPE: 'update_client_type',
  DELETE_CLIENT_TYPE: 'delete_client_type',

  /** Development Type module permissions */
  VIEW_DEVELOPMENT_TYPE: 'view_development_type',
  CREATE_DEVELOPMENT_TYPE: 'create_development_type',
  UPDATE_DEVELOPMENT_TYPE: 'update_development_type',
  DELETE_DEVELOPMENT_TYPE: 'delete_development_type',

  /** Property Type module permissions */
  VIEW_PROPERTY_TYPE: 'view_property_type',
  CREATE_PROPERTY_TYPE: 'create_property_type',
  UPDATE_PROPERTY_TYPE: 'update_property_type',
  DELETE_PROPERTY_TYPE: 'delete_property_type',

  /** User module permissions */
  VIEW_TEAM_USER: 'view_team_user',
  VIEW_BRANCH_USER: 'view_branch_user',
  VIEW_COMPANY_USER: 'view_company_user',
  VIEW_ANY_USER: 'view_any_user',
  CREATE_TEAM_USER: 'create_team_user',
  CREATE_BRANCH_USER: 'create_branch_user',
  CREATE_COMPANY_USER: 'create_company_user',
  CREATE_ANY_USER: 'create_any_user',
  UPDATE_TEAM_USER: 'update_team_user',
  UPDATE_BRANCH_USER: 'update_branch_user',
  UPDATE_COMPANY_USER: 'update_company_user',
  UPDATE_ANY_USER: 'update_any_user',
  DELETE_TEAM_USER: 'delete_team_user',
  DELETE_BRANCH_USER: 'delete_branch_user',
  DELETE_COMPANY_USER: 'delete_company_user',
  DELETE_ANY_USER: 'delete_any_user',

  /** Role module permissions */
  VIEW_ROLE: 'view_role',
  CREATE_ROLE: 'create_role',
  UPDATE_ROLE: 'update_role',
  DELETE_ROLE: 'delete_role',

  /** Team module permissions */
  VIEW_BRANCH_TEAM: 'view_branch_team',
  VIEW_COMPANY_TEAM: 'view_company_team',
  VIEW_ANY_TEAM: 'view_any_team',
  CREATE_BRANCH_TEAM: 'create_branch_team',
  CREATE_COMPANY_TEAM: 'create_company_team',
  CREATE_ANY_TEAM: 'create_any_team',
  UPDATE_BRANCH_TEAM: 'update_branch_team',
  UPDATE_COMPANY_TEAM: 'update_company_team',
  UPDATE_ANY_TEAM: 'update_any_team',
  DELETE_BRANCH_TEAM: 'delete_branch_team',
  DELETE_COMPANY_TEAM: 'delete_company_team',
  DELETE_ANY_TEAM: 'delete_any_team',

  /** Location modules permissions (country, province, district, commune) */
  VIEW_LOCATION: 'view_location',
  CREATE_LOCATION: 'create_location',
  UPDATE_LOCATION: 'update_location',
  DELETE_LOCATION: 'delete_location',

  /** General setting module permissions */
  VIEW_GENERAL_SETTING: 'view_general_setting',
  UPDATE_GENERAL_SETTING: 'update_general_setting',

  /** Property module permissions */
  VIEW_PROPERTY: 'view_property',
  VIEW_ANY_PROPERTY: 'view_any_property',
  CREATE_PROPERTY: 'create_property',
  CREATE_TEAM_PROPERTY: 'create_team_property',
  CREATE_BRANCH_PROPERTY: 'create_branch_property',
  CREATE_COMPANY_PROPERTY: 'create_company_property',
  CREATE_ANY_PROPERTY: 'create_any_property',
  UPDATE_PROPERTY: 'update_property',
  UPDATE_TEAM_PROPERTY: 'update_team_property',
  UPDATE_BRANCH_PROPERTY: 'update_branch_property',
  UPDATE_COMPANY_PROPERTY: 'update_company_property',
  UPDATE_ANY_PROPERTY: 'update_any_property',
  DELETE_PROPERTY: 'delete_property',
  DELETE_BRANCH_PROPERTY: 'delete_branch_property',
  DELETE_COMPANY_PROPERTY: 'delete_company_property',
  DELETE_TEAM_PROPERTY: 'delete_team_property',
  DELETE_ANY_PROPERTY: 'delete_any_property',
  APPROVE_TEAM_LISTING: 'approve_team_property',
  APPROVE_BRANCH_LISTING: 'approve_branch_property',
  APPROVE_COMPANY_LISTING: 'approve_company_property',
  APPROVE_ANY_LISTING: 'approve_any_property',

  /** Property Sale Contacts */
  VIEW_TEAM_PROPERTY_SALE_CONTACT: 'view_team_property_sale_contact',
  VIEW_BRANCH_PROPERTY_SALE_CONTACT: 'view_branch_property_sale_contact',
  VIEW_COMPANY_PROPERTY_SALE_CONTACT: 'view_company_property_sale_contact',
  VIEW_ANY_PROPERTY_SALE_CONTACT: 'view_any_property_sale_contact',

  /** Property Owner Contacts */
  VIEW_TEAM_PROPERTY_OWNER_CONTACT: 'view_team_property_owner_contact',
  VIEW_BRANCH_PROPERTY_OWNER_CONTACT: 'view_branch_property_owner_contact',
  VIEW_COMPANY_PROPERTY_OWNER_CONTACT: 'view_company_property_owner_contact',
  VIEW_ANY_PROPERTY_OWNER_CONTACT: 'view_any_property_owner_contact',

  /** Property Document */
  VIEW_ANY_PROPERTY_DOCUMENT: 'view_any_property_document',
  VIEW_BRANCH_PROPERTY_DOCUMENT: 'view_branch_property_document',
  VIEW_COMPANY_PROPERTY_DOCUMENT: 'view_company_property_document',
  VIEW_TEAM_PROPERTY_DOCUMENT: 'view_team_property_document',

  /** Exclusive module permissions */
  VIEW_EXCLUSIVE: 'view_exclusive',
  VIEW_TEAM_EXCLUSIVE: 'view_team_exclusive',
  VIEW_BRANCH_EXCLUSIVE: 'view_branch_exclusive',
  VIEW_COMPANY_EXCLUSIVE: 'view_company_exclusive',
  VIEW_ANY_EXCLUSIVE: 'view_any_exclusive',
  SET_EXCLUSIVE_AVAILABILITY: 'set_exclusive_availability',
  ADD_EXCLUSIVE_STORY: 'add_exclusive_story',

  /** Project module permissions */
  VIEW_PROJECT: 'view_project',
  CREATE_PROJECT: 'create_project',
  UPDATE_PROJECT: 'update_project',
  DELETE_PROJECT: 'delete_project',

  /** Developer module permissions */
  VIEW_DEVELOPER: 'view_developer',
  CREATE_DEVELOPER: 'create_developer',
  UPDATE_DEVELOPER: 'update_developer',
  DELETE_DEVELOPER: 'delete_developer',

  /** Client module permissions */
  VIEW_CLIENT: 'view_client',
  VIEW_TEAM_CLIENT: 'view_team_client',
  VIEW_BRANCH_CLIENT: 'view_branch_client',
  VIEW_COMPANY_CLIENT: 'view_company_client',
  VIEW_ANY_CLIENT: 'view_any_client',
  CREATE_CLIENT: 'create_client',
  CREATE_TEAM_CLIENT: 'create_team_client',
  CREATE_BRANCH_CLIENT: 'create_branch_client',
  CREATE_COMPANY_CLIENT: 'create_company_client',
  CREATE_ANY_CLIENT: 'create_any_client',
  UPDATE_CLIENT: 'update_client',
  UPDATE_TEAM_CLIENT: 'update_team_client',
  UPDATE_BRANCH_CLIENT: 'update_branch_client',
  UPDATE_COMPANY_CLIENT: 'update_company_client',
  UPDATE_ANY_CLIENT: 'update_any_client',
  DELETE_CLIENT: 'delete_client',
  DELETE_TEAM_CLIENT: 'delete_team_client',
  DELETE_BRANCH_CLIENT: 'delete_branch_client',
  DELETE_COMPANY_CLIENT: 'delete_company_client',
  DELETE_ANY_CLIENT: 'delete_any_client',

  /** Company Info module permissions */
  VIEW_ANY_COMPANY: 'view_any_company',
  CREATE_ANY_COMPANY: 'create_any_company',
  UPDATE_ANY_COMPANY: 'update_any_company',
  DELETE_ANY_COMPANY: 'delete_any_company',

  /** Company Branch module permissions */
  VIEW_COMPANY_BRANCH: 'view_company_branch',
  VIEW_ANY_COMPANY_BRANCH: 'view_any_company_branch',
  CREATE_COMPANY_BRANCH: 'create_company_branch',
  CREATE_ANY_COMPANY_BRANCH: 'create_any_company_branch',
  UPDATE_COMPANY_BRANCH: 'update_company_branch',
  UPDATE_ANY_COMPANY_BRANCH: 'update_any_company_branch',
  DELETE_COMPANY_BRANCH: 'delete_company_branch',
  DELETE_ANY_COMPANY_BRANCH: 'delete_any_company_branch',

  /** Proposal module permissions */
  VIEW_PROPOSAL: 'view_proposal',
  VIEW_TEAM_PROPOSAL: 'view_team_proposal',
  VIEW_BRANCH_PROPOSAL: 'view_branch_proposal',
  VIEW_COMPANY_PROPOSAL: 'view_company_proposal',
  VIEW_ANY_PROPOSAL: 'view_any_proposal',
  CREATE_PROPOSAL: 'create_proposal',
  CREATE_TEAM_PROPOSAL: 'create_team_proposal',
  CREATE_BRANCH_PROPOSAL: 'create_branch_proposal',
  CREATE_COMPANY_PROPOSAL: 'create_company_proposal',
  CREATE_ANY_PROPOSAL: 'create_any_proposal',
  UPDATE_PROPOSAL: 'update_proposal',
  UPDATE_TEAM_PROPOSAL: 'update_team_proposal',
  UPDATE_BRANCH_PROPOSAL: 'update_branch_proposal',
  UPDATE_COMPANY_PROPOSAL: 'update_company_proposal',
  UPDATE_ANY_PROPOSAL: 'update_any_proposal',
  DELETE_PROPOSAL: 'delete_proposal',
  DELETE_TEAM_PROPOSAL: 'delete_team_proposal',
  DELETE_BRANCH_PROPOSAL: 'delete_branch_proposal',
  DELETE_COMPANY_PROPOSAL: 'delete_company_proposal',
  DELETE_ANY_PROPOSAL: 'delete_any_proposal',

  /** Loan module permissions */
  VIEW_LOAN_APPLICATION: 'view_loan_application',
  VIEW_ANY_LOAN_APPLICATION: 'view_any_loan_application',
  CREATE_LOAN_APPLICATION: 'create_loan_application',
  UPDATE_LOAN_APPLICATION: 'update_loan_application',
  UPDATE_ANY_LOAN_APPLICATION: 'update_any_loan_application',
  DELETE_LOAN_APPLICATION: 'delete_loan_application',
  DELETE_ANY_LOAN_APPLICATION: 'delete_any_loan_application',
  APPROVE_LOAN_APPLICATION: 'approve_loan_application',
  COMMENT_ON_LOAN_APPLICATION: 'comment_on_loan_application',
  ANALYSE_LOAN_APPLICATION: 'analyse_loan',
  PRINT_LOAD_PAYMENT_SCHEDULE: 'print_loan_payment_schedule',

  /** Loan rate module permissions */
  VIEW_LOAN_RATE: 'view_loan_rate',
  UPDATE_LOAN_RATE: 'update_loan_rate',

  /** Loan cashflow module permissions */
  VIEW_CASH_FLOW: 'view_loan_cash_flow',
  PRINT_CASH_FLOW: 'print_loan_cash_flow',

  /** Bank  module permissions */
  VIEW_BANK: 'view_bank',
  CREATE_BANK: 'create_bank',
  UPDATE_BANK: 'update_bank',
  DELETE_BANK: 'delete_bank',

  /** Bank Branch module permissions */
  VIEW_BANK_BRANCH: 'view_bank_branch',
  CREATE_BANK_BRANCH: 'create_bank_branch',
  UPDATE_BANK_BRANCH: 'update_bank_branch',
  DELETE_BANK_BRANCH: 'delete_bank_branch',

  /** Audit report module permissions */
  VIEW_AUDIT_REPORT: 'view_audit_report',
  DOWNLOAD_AUDIT_REPORT: 'download_audit_report',

  /** Valuation report module permissions */
  VIEW_VALUATION_REPORT: 'view_valuation_report',
  CREATE_VALUATION_REPORT: 'create_valuation_report',
  UPDATE_VALUATION_REPORT: 'update_valuation_report',
  DELETE_VALUATION_REPORT: 'delete_valuation_report',

  /** Evaluated report module permissions */
  VIEW_EVALUATED_REPORT: 'view_evaluated_report',
  DOWNLOAD_EVALUATED_REPORT: 'download_evaluated_report',

  /** Facility module permissions */
  VIEW_FACILITY: 'view_facility',
  CREATE_FACILITY: 'create_facility',
  UPDATE_FACILITY: 'update_facility',
  DELETE_FACILITY: 'delete_facility',

  /** Transfer module permission */
  TRANSFER_TEAM_PROPERTY: 'transfer_team_property',
  TRANSFER_BRANCH_PROPERTY: 'transfer_branch_property',
  TRANSFER_COMPANY_PROPERTY: 'transfer_company_property',
  PUBLISH_TEAM_LISTING: 'publish_team_property',
  PUBLISH_BRANCH_LISTING: 'publish_branch_property',
  PUBLISH_COMPANY_LISTING: 'publish_company_property',
  PUBLISH_ANY_LISTING: 'publish_any_property'
})
