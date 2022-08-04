import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authDevelopmentType() {
    const { userCan } = useAuth()

    const canView = (developmentType = {}) => {
        const permissions = [Permission.VIEW_DEVELOPMENT_TYPE]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_DEVELOPMENT_TYPE]
        return userCan(permissions)
    }

    const canUpdate = (developmentType = {}) => {
        const permissions = [Permission.UPDATE_DEVELOPMENT_TYPE]
        return userCan(permissions)
    }

    const canDelete = (developmentType = {}) => {
        const permissions = [Permission.DELETE_DEVELOPMENT_TYPE]
        return userCan(permissions)
    }

    return {
        canCreate,
        canView,
        canDelete,
        canUpdate
    }
}
