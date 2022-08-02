import { useContext } from '@nuxtjs/composition-api'
import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authProject() {
  const { $auth } = useContext()
  const { isSuperAdmin, userCan } = useAuth()

  const canView = (project = {}) => {
    const permissions = [Permission.VIEW_PROJECT]

    if (!project || !project.id) {
      return $auth.user && userCan(permissions)
    }

    return $auth.user && (isSuperAdmin.value || userCan(permissions))
  }

  const canCreate = () => {
    const permissions = [Permission.CREATE_PROJECT]

    return $auth.user && userCan(permissions)
  }

  const canUpdate = (project = {}) => {
    const permissions = [Permission.UPDATE_PROJECT]

    if (!project || !project.id) {
      return $auth.user && userCan(permissions)
    }

    return $auth.user && (isSuperAdmin.value || userCan(permissions))
  }

  const canDelete = (project = {}) => {
    const permissions = [Permission.DELETE_PROJECT]

    if (!project || !project.id) {
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
