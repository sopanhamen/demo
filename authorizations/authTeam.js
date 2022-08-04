import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authTeam() {
    const { userCan } = useAuth()

    const canView = (team = {}) => {
        const permissions = [
            Permission.VIEW_BRANCH_TEAM,
            Permission.VIEW_COMPANY_TEAM,
            Permission.VIEW_ANY_TEAM
        ]

        return userCan(permissions)
    }

    const canCreate = () => {
        const permissions = [
            Permission.CREATE_BRANCH_TEAM,
            Permission.CREATE_COMPANY_TEAM,
            Permission.CREATE_ANY_TEAM
        ]

        return userCan(permissions)
    }

    const canUpdate = (user = {}) => {
        const permissions = [
            Permission.UPDATE_BRANCH_TEAM,
            Permission.UPDATE_COMPANY_TEAM,
            Permission.UPDATE_ANY_TEAM
        ]

        return userCan(permissions)
    }

    const canDelete = (user = {}) => {
        const permissions = [
            Permission.DELETE_BRANCH_TEAM,
            Permission.DELETE_COMPANY_TEAM,
            Permission.DELETE_ANY_TEAM
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
