import { useContext, useRoute, useStore } from '@nuxtjs/composition-api'
import { auth } from '~/config'

export default function useAuth() {
    const { commit, dispatch } = useStore()
    const { error, i18n, route, $auth, localePath } = useContext()

    const router = useRoute()

    const fetchPermissions = async () => {
        if (!auth.user) {
            return false
        }

        const permissions = await dispatch()
    }
}
