import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authDistrict() {
    const { userCan } = useAuth()

    const canView = (district = {}) => {
        const permissions = [Permission.VIEW_LOCATION]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_LOCATION]
        return userCan(permissions)
    }

    const canUpdate = (district = {}) => {
        const permissions = [Permission.UPDATE_LOCATION]
        return userCan(permissions)
    }

    const canDelete = (district = {}) => {
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
