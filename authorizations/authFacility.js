import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authFacility() {
    const { userCan } = useAuth()

    const canView = (facility = {}) => {
        const permissions = [Permission.VIEW_FACILITY]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_FACILITY]
        return userCan(permissions)
    }

    const canUpdate = (facility = {}) => {
        const permissions = [Permission.UPDATE_FACILITY]
        return userCan(permissions)
    }

    const canDelete = (facility = {}) => {
        const permissions = [Permission.DELETE_FACILITY]
        return userCan(permissions)
    }

    return {
        canCreate,
        canView,
        canDelete,
        canUpdate
    }
}
