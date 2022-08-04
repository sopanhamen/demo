import {
    computed,
    useContext,
    useRouter,
    useStore
} from '@nuxtjs/composition-api'
import useMenu from '@/composables/useMenu'

export default function useAuth() {
    const { commit, dispatch } = useStore()
    const { error, i18n, route, $auth, localePath } = useContext()
    const router = useRouter()

    const fetchPermissions = async () => {
        if (!$auth.user) {
            clearPermission()
            return false
        }

        const permissions = await dispatch(
            'authorization/fetchPermissions',
            $auth.user
        )

        return { permissions }
    }

    const permissions = computed(() => {
        if (!$auth || !$auth.loggedIn) {
            return []
        }

        return $auth.user?.permissions
    })

    const isSuperAdmin = computed(() => {
        return (
            $auth &&
            $auth.user &&
            permissions.value.length > 0 &&
            permissions.value[0] === '*'
        )
    })

    const hasSuperAdminRole = (user) => {
        return !!user.roles.find((role) => role.name === 'Super Admin')
    }

    const userCan = (permission) => {
        if (!$auth || !$auth.user) {
            return false
        }

        if (!permissions.value || permissions.value.length === 0) {
            return false
        }

        if (isSuperAdmin.value) {
            return true
        }

        if (Array.isArray(permission)) {
            return permissions.value.some((p) => permission.includes(p))
        }

        return permissions.value.includes(permission)
    }

    const clearPermission = () => {
        return commit('authorization/CLEAR_PERMISSION')
    }

    const logout = () => {
        clearPermission()
        $auth.logout()
    }

    const { ADMIN_MENU_ITEMS } = useMenu()

    const findActivePage = () => {
        const path = route.value.path
        let page = null

        ADMIN_MENU_ITEMS.value.forEach((group) => {
            if (group.menus) {
                group.menus.forEach((menu) => {
                    if (menu.submenus) {
                        menu.submenus.forEach((submenu) => {
                            if (submenu.link === path) {
                                page = submenu
                            }
                        })
                    } else if (menu.link === path) {
                        page = menu
                    }
                })
            } else if (group.link === path) {
                page = group
            }
        })

        return page
    }

    const guard = (condition, errorCode = 403) => {
        const checked =
            condition instanceof Function ? condition() : condition === true

        if (!checked) {
            error({
                statusCode: errorCode,
                message: i18n.t('message.unauthorized')
            })
        }

        return true
    }

    const authorizeCurrentPage = () => {
        if (!permissions.value || permissions.value.length === 0) {
            return router.push(localePath('/admin/auth/login'))
        }

        const page = findActivePage()
        if (page && page.permissions && !userCan(page.permissions)) {
            error({ statusCode: 403, message: i18n.t('message.unauthorized') })
            return false
        }

        return true
    }

    return {
        isSuperAdmin,
        permissions,
        hasSuperAdminRole,
        guard,
        authorizeCurrentPage,
        logout,
        fetchPermissions,
        clearPermission,
        userCan
    }
}
