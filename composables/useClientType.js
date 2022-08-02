import { useContext } from '@nuxtjs/composition-api'
import useAuth from '~/authorizations/useAuth'
import { Permission } from '~/enums/Permission'

export default function useClientType() {
    const { $auth } = useContext()
    const { isSuperAdmin, userCan } = useAuth()

    const canView = (clientType = {}) => {
        const permissions = [Permission.VIEW_CLIENT_TYPE]
        if (!clientType || !clientType.id) {
            return $auth.user && userCan(permissions)
        }
        return $auth.user && (isSuperAdmin.value || userCan(permissions))
    }
    const canCreate = () => {
        const permissions = [Permission.CREATE_CLIENT_TYPE]

        return $auth.user && userCan(permissions)
    }

    const canUpdate = (clientType = {}) => {
        const permissions = [Permission.UPDATE_CLIENT_TYPE]

        if (!clientType || !clientType.id) {
            return $auth.user && userCan(permissions)
        }

        return $auth.user && (isSuperAdmin.value || userCan(permissions))
    }
    const canDelete = (clientType = {}) => {
        const permissions = [Permission.DELETE_CLIENT_TYPE]

        if (!clientType || !clientType.id) {
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
