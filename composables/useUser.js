import { computed, ref, useContext, useStore } from '@nuxtjs/composition-api'

export default function useUser() {
    const { $service } = useContext()
    const { store } = useStore()

    const users = ref([])

    const fetchedUsers = computed(() => {
        return users.value
    })

    const userOfTeam = computed(() => (teamId) => {
        return store.getters['user/getUsersByTeam'](teamId)
    })

    const searchByTeam = async (value, teamId, options = {}) => {
        if (!value && teamId) {
            const { data } = await $service.user.get({
                ...options,
                team_id: teamId
            })

            if (data) {
                users.value = data

                store.commit('user/ADD_USERS', data)

                return users.value
            }
        }

        const { data } = await $service.user.search('name', value, {
            ...options,
            team_id: teamId
        })

        if (data) {
            users.value = data

            store.commit('user/ADD_USERS', data)

            return users.value
        }
    }

    const searchUser = async (value) => {
        const { data } = await $service.user.search('name', value)

        if (data) {
            users.value = data

            store.commit('user/ADD_USERS', users.value)

            return users.value
        }
    }

    return {
        users,
        userOfTeam,
        fetchedUsers,
        searchUser,
        searchByTeam
    }
}
