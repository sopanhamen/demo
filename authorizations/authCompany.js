import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authCompany() {
    const { userCan } = useAuth()

    const canView = (company = {}) => {
        const permissions = [Permission.VIEW_COMPANY]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_COMPANY]
        return userCan(permissions)
    }

    const canUpdate = (company = {}) => {
        const permissions = [Permission.UPDATE_COMPANY]
        return userCan(permissions)
    }

    const canDelete = (company = {}) => {
        const permissions = [Permission.DELETE_COMPANY]
        return userCan(permissions)
    }

    return {
        canCreate,
        canView,
        canDelete,
        canUpdate
    }
}
