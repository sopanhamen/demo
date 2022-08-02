import { useContext } from '@nuxtjs/composition-api'
import { Permission } from '@/enums/Permission'
import useAuth from '@/authorizations/useAuth'

/**
 * This is a Composable function used to
 * create client side authorization check on Property Module
 *
 *
 * @returns Object
 */
export default function authProperty() {
  const { isSuperAdmin, userCan } = useAuth()
  const { $auth } = useContext()

  /**
   * Check if user IS OWNER OF THE PROPERTY
   * User has ownership over the property
   *
   * @param {*} property
   * @returns
   */
  const isOwner = (property) => {
    if (!property || !property.id || !$auth || !$auth.user) {
      return false
    }

    const userId = $auth.user.id

    return property.assignee?.id === userId || property.assignor?.id === userId
  }

  /**
   * Check if user CAN VIEW A PROPERTY SALE CONTACT
   * User can view property sale contact
   * base on permissions, team, branch, company and ownership
   *
   * @param {*} property
   * @returns Boolean
   */
  const canView = (property = {}) => {
    const permissions = [Permission.VIEW_PROPERTY]

    if (!property || !property.id) {
      return userCan(permissions)
    }

    return isOwner(property) || userCan(permissions)
  }

  /**
   * Check if user CAN VIEW A PROPERTY DOCUMENT
   * User can view property document
   * base on permissions, team, branch, company and ownership
   *
   * @param {*} property
   * @returns Boolean
   */
  const canViewDocument = (property = {}) => {
    if (!property || !property.id) {
      return false
    }

    if (isOwner(property)) {
      return true
    }

    if (userCan(Permission.VIEW_COMPANY_PROPERTY_DOCUMENT)) {
      return property.company_id === $auth.user.profile.company_id
    }

    if (userCan(Permission.VIEW_BRANCH_PROPERTY_DOCUMENT)) {
      return property.company_branch_id === $auth.user.profile.company_branch_id
    }

    if (userCan(Permission.VIEW_TEAM_PROPERTY_DOCUMENT)) {
      return property.team_id === $auth.user.current_team_id
    }

    return false
  }

  const canTransfer = (property) => {
    if (!property) {
      return userCan([
        Permission.TRANSFER_TEAM_PROPERTY,
        Permission.TRANSFER_BRANCH_PROPERTY,
        Permission.TRANSFER_COMPANY_PROPERTY
      ])
    }

    if (userCan(Permission.TRANSFER_TEAM_PROPERTY)) {
      return property.team_id === $auth.user.current_team_id
    }

    if (userCan(Permission.TRANSFER_BRANCH_PROPERTY)) {
      return property.company_branch_id === $auth.user.profile.company_branch_id
    }

    if (userCan(Permission.TRANSFER_COMPANY_PROPERTY)) {
      return property.company_id === $auth.user.profile.company_id
    }
  }

  const canTransferCompany = () => {
    const permissions = [Permission.TRANSFER_COMPANY_PROPERTY]
    return userCan(permissions)
  }

  const canTransferBranch = () => {
    const permissions = [Permission.TRANSFER_BRANCH_PROPERTY]
    return userCan(permissions)
  }

  const canTransferTeam = () => {
    const permissions = [Permission.TRANSFER_TEAM_PROPERTY]
    return userCan(permissions)
  }

  /**
   * Check if user CAN VIEW A PROPERTY OWNER CONTACT
   * User can view property owner contact
   * base on permissions, team, branch, company and ownership
   *
   * @param {*} property
   * @returns Boolean
   */
  const canViewOwnerContact = (property = {}) => {
    if (isSuperAdmin.value || isOwner(property)) {
      return true
    }

    if (userCan(Permission.VIEW_COMPANY_PROPERTY_OWNER_CONTACT)) {
      return property.company_id === $auth.user.profile.company_id
    }

    if (userCan(Permission.VIEW_BRANCH_PROPERTY_OWNER_CONTACT)) {
      return property.company_branch_id === $auth.user.profile.company_branch_id
    }

    if (userCan(Permission.VIEW_TEAM_PROPERTY_OWNER_CONTACT)) {
      return property.team_id === $auth.user.current_team_id
    }

    return false
  }

  /**
   * Check if user CAN VIEW A PROPERTY SALE CONTACT
   * User can view property sale contact
   * base on permissions, team, branch, company and ownership
   *
   * @returns Boolean
   */
  const canViewSaleContact = (property = {}) => {
    if (isSuperAdmin.value || isOwner(property)) {
      return true
    }

    if (userCan(Permission.VIEW_COMPANY_PROPERTY_SALE_CONTACT)) {
      return property.company_id === $auth.user.profile.company_id
    }

    if (userCan(Permission.VIEW_BRANCH_PROPERTY_SALE_CONTACT)) {
      return property.company_branch_id === $auth.user.profile.company_branch_id
    }

    if (userCan(Permission.VIEW_TEAM_PROPERTY_SALE_CONTACT)) {
      return property.team_id === $auth.user.current_team_id
    }

    return false
  }

  /**
   * Check if user CAN CREATE A PROPERTY
   * User can create a property
   *
   * @param {*} property
   * @returns Boolean
   */
  const canCreate = () => {
    const permissions = [
      Permission.CREATE_PROPERTY,
      Permission.CREATE_TEAM_PROPERTY,
      Permission.CREATE_BRANCH_PROPERTY,
      Permission.CREATE_COMPANY_PROPERTY
    ]

    return userCan(permissions)
  }

  /**
   * Check if user CAN UPDATE A PROPERTY
   * User can update property
   * base on permissions, team, branch, company and ownership
   *
   * @param {*} property
   * @returns Boolean
   */
  const canUpdate = (property = {}) => {
    if (!property || !property.id) {
      return false
    }

    if (
      isOwner(property) &&
      userCan([
        Permission.UPDATE_PROPERTY,
        Permission.UPDATE_TEAM_PROPERTY,
        Permission.UPDATE_BRANCH_PROPERTY,
        Permission.UPDATE_COMPANY_PROPERTY
      ])
    ) {
      return true
    }

    if (userCan(Permission.UPDATE_COMPANY_PROPERTY)) {
      return property.company_id === $auth.user.profile.company_id
    }

    if (userCan(Permission.UPDATE_BRANCH_PROPERTY)) {
      return property.company_branch_id === $auth.user.profile.company_branch_id
    }

    if (userCan(Permission.UPDATE_TEAM_PROPERTY)) {
      return property.team_id === $auth.user.current_team_id
    }

    return false
  }

  /**
   * Check if user CAN DELETE A PROPERTY
   * User can delete property
   * base on permissions, team, branch, company and ownership
   *
   * @param {*} property
   * @returns Boolean
   */
  const canDelete = (property = {}) => {
    if (!property || !property.id) {
      return userCan([
        Permission.DELETE_PROPERTY,
        Permission.DELETE_TEAM_PROPERTY,
        Permission.DELETE_BRANCH_PROPERTY,
        Permission.DELETE_COMPANY_PROPERTY
      ])
    }

    if (userCan(Permission.DELETE_COMPANY_PROPERTY)) {
      return property.company_id === $auth.user.profile.company_id
    }

    if (userCan(Permission.DELETE_BRANCH_PROPERTY)) {
      return property.company_branch_id === $auth.user.profile.company_branch_id
    }

    if (userCan(Permission.DELETE_TEAM_PROPERTY)) {
      return property.team_id === $auth.user.current_team_id
    }

    return (
      isOwner(property) &&
      userCan([
        Permission.DELETE_PROPERTY,
        Permission.DELETE_TEAM_PROPERTY,
        Permission.DELETE_BRANCH_PROPERTY,
        Permission.DELETE_COMPANY_PROPERTY
      ])
    )
  }

  const canApprove = (property = {}) => {
    if (!property || !property.id || property.approved_by) {
      return false
    }

    if (
      isOwner(property) &&
      userCan([
        Permission.APPROVE_ANY_LISTING,
        Permission.APPROVE_TEAM_LISTING,
        Permission.APPROVE_BRANCH_LISTING,
        Permission.APPROVE_COMPANY_LISTING
      ])
    ) {
      return true
    }

    if (userCan(Permission.APPROVE_COMPANY_LISTING)) {
      return (
        property.company_id === $auth.user.profile.company_id &&
        !property.approved_by
      )
    }

    if (userCan(Permission.APPROVE_BRANCH_LISTING)) {
      return (
        property.company_branch_id === $auth.user.profile.company_branch_id &&
        !property.approved_by
      )
    }

    if (userCan(Permission.APPROVE_TEAM_LISTING)) {
      return (
        property.team_id === $auth.user.current_team_id && !property.approved_by
      )
    }

    return false
  }

  const canPublish = (property = {}) => {
    if (!property || !property.id || property.published) {
      return false
    }

    if (
      isOwner(property) &&
      userCan([
        Permission.PUBLISH_ANY_LISTING,
        Permission.PUBLISH_TEAM_LISTING,
        Permission.PUBLISH_BRANCH_LISTING,
        Permission.PUBLISH_COMPANY_LISTING
      ])
    ) {
      return true
    }

    if (userCan(Permission.PUBLISH_COMPANY_LISTING)) {
      return property.company_id === $auth.user.profile.company_id
    }

    if (userCan(Permission.PUBLISH_BRANCH_LISTING)) {
      return property.company_branch_id === $auth.user.profile.company_branch_id
    }

    if (userCan(Permission.PUBLISH_TEAM_LISTING)) {
      return property.team_id === $auth.user.current_team_id
    }

    return false
  }

  return {
    canPublish,
    canApprove,
    canCreate,
    canView,
    canDelete,
    canUpdate,
    canViewDocument,
    canTransfer,
    canTransferCompany,
    canTransferBranch,
    canTransferTeam,
    canViewOwnerContact,
    canViewSaleContact
  }
}
