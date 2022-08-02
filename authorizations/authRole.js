import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authRole() {
  const { userCan } = useAuth()

  const canView = (role = {}) => {
    const permissions = [Permission.VIEW_ROLE]
    return userCan(permissions)
  }

  const canCreate = () => {
    const permissions = [Permission.CREATE_ROLE]
    return userCan(permissions)
  }

  const canUpdate = (role = {}) => {
    const permissions = [Permission.UPDATE_ROLE]
    return userCan(permissions)
  }

  const canDelete = (role = {}) => {
    const permissions = [Permission.DELETE_ROLE]
    if (role?.id && (role.users_count > 0 || role.users?.length > 0)) {
      return false
    }

    return userCan(permissions)
  }

  return {
    canCreate,
    canView,
    canDelete,
    canUpdate
  }
}
