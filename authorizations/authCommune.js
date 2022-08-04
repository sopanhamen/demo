import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authCommune() {
    const { userCan } = useAuth()

    const canView = (commune = {}) => {
        const permissions = [Permission.VIEW_LOCATION]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_LOCATION]
        return userCan(permissions)
    }

    const canUpdate = (commune = {}) => {
        const permissions = [Permission.UPDATE_LOCATION]
        return userCan(permissions)
    }

    const canDelete = (commune = {}) => {
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
