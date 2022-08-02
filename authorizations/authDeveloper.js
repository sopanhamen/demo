import { useContext } from '@nuxtjs/composition-api'
import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function useDeveloperAuth() {
  const { $auth } = useContext()
  const { isSuperAdmin, userCan } = useAuth()

  const canView = (developer = {}) => {
    const permissions = [Permission.VIEW_DEVELOPER]

    if (!developer || !developer.id) {
      return $auth.user && userCan(permissions)
    }

    return $auth.user && (isSuperAdmin.value || userCan(permissions))
  }

  const canCreate = () => {
    const permissions = [Permission.CREATE_DEVELOPER]

    return $auth.user && userCan(permissions)
  }

  const canUpdate = (developer = {}) => {
    const permissions = [Permission.UPDATE_DEVELOPER]

    if (!developer || !developer.id) {
      return $auth.user && userCan(permissions)
    }

    return $auth.user && (isSuperAdmin.value || userCan(permissions))
  }

  const canDelete = (developer = {}) => {
    const permissions = [Permission.DELETE_DEVELOPER]

    if (!developer || !developer.id) {
      return $auth.user && userCan(permissions)
    }

    return $auth.user && (isSuperAdmin.value || userCan(permissions))
  }

  return {
    canCreate,
    canView,
    canDelete,
    canUpdate
  }
}
