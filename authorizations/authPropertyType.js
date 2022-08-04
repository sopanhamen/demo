import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authPropertyType() {
    const { userCan } = useAuth()

    const canView = (propertyType = {}) => {
        const permissions = [Permission.VIEW_PROPERTY_TYPE]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_PROPERTY_TYPE]
        return userCan(permissions)
    }

    const canUpdate = (propertyType = {}) => {
        const permissions = [Permission.UPDATE_PROPERTY_TYPE]
        return userCan(permissions)
    }

    const canDelete = (propertyType = {}) => {
        const permissions = [Permission.DELETE_PROPERTY_TYPE]
        return userCan(permissions)
    }

    return {
        canCreate,
        canView,
        canDelete,
        canUpdate
    }
}
