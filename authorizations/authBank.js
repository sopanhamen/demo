import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authBank() {
    const { userCan } = useAuth()

    const canView = (bank = {}) => {
        const permissions = [Permission.VIEW_BANK]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_BANK]
        return userCan(permissions)
    }

    const canUpdate = (bank = {}) => {
        const permissions = [Permission.UPDATE_BANK_BRANCH]
        return userCan(permissions)
    }

    const canDelete = (bank = {}) => {
        const permissions = [Permission.DELETE_BANK_BRANCH]
        return userCan(permissions)
    }

    return {
        canCreate,
        canView,
        canDelete,
        canUpdate
    }
}
