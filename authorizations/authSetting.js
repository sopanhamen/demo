import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authSetting() {
  const { userCan } = useAuth()

  const canView = (role = {}) => {
    const permissions = [Permission.VIEW_GENERAL_SETTING]
    return userCan(permissions)
  }

  const canUpdate = (role = {}) => {
    const permissions = [Permission.UPDATE_GENERAL_SETTING]
    return userCan(permissions)
  }

  return {
    canView,
    canUpdate
  }
}
