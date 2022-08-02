import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authProvince() {
  const { userCan } = useAuth()

  const canView = (province = {}) => {
    const permissions = [Permission.VIEW_LOCATION]
    return userCan(permissions)
  }

  const canCreate = () => {
    const permissions = [Permission.CREATE_LOCATION]
    return userCan(permissions)
  }

  const canUpdate = (province = {}) => {
    const permissions = [Permission.UPDATE_LOCATION]
    return userCan(permissions)
  }

  const canDelete = (province = {}) => {
    const permissions = [Permission.DELETE_LOCATION]
    return userCan(permissions)
  }

  return {
    canCreate,
    canView,
    canDelete,
    canUpdate
  }
}
