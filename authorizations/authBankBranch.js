import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authBankBranch() {
    const { userCan } = useAuth()

    const canView = (bankBranch = {}) => {
        const permissions = [Permission.VIEW_BANK_BRANCH]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_BANK_BRANCH]
        return userCan(permissions)
    }

    const canUpdate = (bankBranch = {}) => {
        const permissions = [Permission.UPDATE_BANK_BRANCH]
        return userCan(permissions)
    }

    const canDelete = (bankBranch = {}) => {
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
