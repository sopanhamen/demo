import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authCompanyBranch() {
    const { userCan } = useAuth()

    const canView = (branch = {}) => {
        const permissions = [Permission.VIEW_COMPANY_BRANCH]
        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [Permission.CREATE_COMPANY_BRANCH]
        return userCan(permissions)
    }

    const canUpdate = (branch = {}) => {
        const permissions = [Permission.UPDATE_COMPANY_BRANCH]
        return userCan(permissions)
    }

    const canDelete = (branch = {}) => {
        const permissions = [Permission.DELETE_COMPANY_BRANCH]
        return userCan(permissions)
    }

    return {
        canCreate,
        canView,
        canDelete,
        canUpdate
    }
}
