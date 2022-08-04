import { useContext } from '@nuxtjs/composition-api'
import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authClient() {
    const { isSuperAdmin, userCan } = useAuth()
    const { $auth } = useContext()

    const isOwner = (client) => {
        if (!client || !client.uuid || !$auth || !$auth.user) {
            return false
        }

        const userId = $auth.user.id
        return (client.creator ? client.creator.id : null) === userId
    }

    const canView = (client = {}) => {
        const permissions = [
            Permission.VIEW_CLIENT,
            Permission.VIEW_COMPANY_CLIENT,
            Permission.VIEW_BRANCH_CLIENT,
            Permission.VIEW_TEAM_CLIENT,
            Permission.VIEW_ANY_CLIENT
        ]

        if (!client || !client.uuid) {
            return userCan(permissions)
        }

        return isSuperAdmin.value || (isOwner(client) && userCan(permissions))
    }

    const canCreate = () => {
        const permissions = [
            Permission.CREATE_CLIENT,
            Permission.CREATE_COMPANY_CLIENT,
            Permission.CREATE_BRANCH_CLIENT,
            Permission.CREATE_TEAM_CLIENT,
            Permission.CREATE_ANY_CLIENT
        ]

        return userCan(permissions)
    }

    const canUpdate = (client = {}) => {
        const permissions = [
            Permission.UPDATE_CLIENT,
            Permission.UPDATE_COMPANY_CLIENT,
            Permission.UPDATE_BRANCH_CLIENT,
            Permission.UPDATE_TEAM_CLIENT,
            Permission.UPDATE_ANY_CLIENT
        ]

        if (!client || !client.uuid) {
            return userCan(permissions)
        }

        return isSuperAdmin.value || (isOwner(client) && userCan(permissions))
    }

    const canDelete = (client = {}) => {
        const permissions = [
            Permission.DELETE_CLIENT,
            Permission.DELETE_COMPANY_CLIENT,
            Permission.DELETE_BRANCH_CLIENT,
            Permission.DELETE_TEAM_CLIENT,
            Permission.DELETE_ANY_CLIENT
        ]

        if (!client || !client.uuid) {
            return userCan(permissions)
        }

        return isSuperAdmin.value || (isOwner(client) && userCan(permissions))
    }

    return {
        canCreate,
        canView,
        canDelete,
        canUpdate
    }
}
