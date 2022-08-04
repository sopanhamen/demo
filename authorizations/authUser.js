import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authUser() {
    const { userCan } = useAuth()

    const canView = (team = {}) => {
        const permissions = [
            Permission.VIEW_TEAM_USER,
            Permission.VIEW_BRANCH_USER,
            Permission.VIEW_COMPANY_USER
        ]

        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [
            Permission.CREATE_TEAM_USER,
            Permission.CREATE_BRANCH_USER,
            Permission.CREATE_COMPANY_USER
        ]

        return userCan(permissions)
    }

    const canUpdate = (user = {}) => {
        const permissions = [
            Permission.UPDATE_TEAM_USER,
            Permission.UPDATE_BRANCH_USER,
            Permission.UPDATE_COMPANY_USER
        ]

        return userCan(permissions)
    }

    const canDelete = (user = {}) => {
        const permissions = [
            Permission.DELETE_TEAM_USER,
            Permission.DELETE_BRANCH_USER,
            Permission.DELETE_COMPANY_USER
        ]

        return userCan(permissions)
    }

    return {
        canCreate,
        canView,
        canDelete,
        canUpdate
    }
}
