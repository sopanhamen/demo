import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authCountry() {
    const { userCan } = useAuth()

    const canView = (country = {}) => {
        const permissions = [Permission.VIEW_LOCATION]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_LOCATION]
        return userCan(permissions)
    }

    const canUpdate = (country = {}) => {
        const permissions = [Permission.UPDATE_LOCATION]
        return userCan(permissions)
    }

    const canDelete = (country = {}) => {
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
