<template>
    <div
        id="admin"
        data-color="default"
        data-font="nunito"
        class="w-full flex-nowrap flex text-sm"
    ></div>
</template>
<script>
import {
    computed,
    defineComponent,
    onMounted,
    useContext,
    useRouter,
    useStore
} from '@nuxtjs/composition-api'
import useResource from '@/composables/useResource'
import authProperty from '@/authorizations/authProperty'
import authProject from '@/authorizations/authProject'
import authClient from '@/authorizations/authClient'

export default defineComponent({
    name: 'adminLayout',
    middleware: ['auth', 'authorized', 'team'],
    loading: {
        continuous: true
    },
    setup() {
        const { fetchResources } = useResource
        onMounted(async () => {
            await fetchResources()
        })
        const { i18n, localePath } = useContext()
        const router = useRouter()

        const { canCreate: canCreateProperty } = authProperty()
        const { canCreate: canCreateProject } = authProject()
        const { canCreate: canCreateClient } = authClient()

        const speedDialMenu = computed(() => {
            const items = []

            if (canCreateProperty()) {
                items.push({
                    label: i18n.t('common.new_property'),
                    icon: 'fa fa-home',
                    detail: 'Data Added',
                    command: () => {
                        router.push(
                            localePath('/admin/properties/listings/create')
                        )
                    }
                })
            }
            if (canCreateProject()) {
                items.push({
                    label: i18n.t('common.new_project'),
                    icon: 'fa fa-building',
                    detail: 'Data Added',
                    command: () => {
                        router.push(localePath('/admin/projects/create'))
                    }
                })
            }
            if (canCreateClient()) {
                items.push({
                    label: i18n.t('common.new_client'),
                    icon: 'fa fa-users',
                    detail: 'Data Added',
                    command: () => {
                        router.push(localePath('/admin/clients/create'))
                    }
                })
            }

            items.push({
                label: i18n.t('common.refresh'),
                icon: 'fa fa-arrows-rotate',
                detail: 'Data Added',
                command: () => {
                    fetchResources(true)
                }
            })
            return items
        })

        const pageHeight = '0px'
        const mobileSize = MOBILE_SCREEN_SIZE
        const { state } = useStore()
        const showSidebar = computed(() => state.theme.admin.showSidebar)
        const windowWidth = computed(() => state.theme.admin.windowWidth)
        const { $auth } = useContext()

        const { commit } = useStore()

        onMounted(() => {
            commit('user/ADD_USERS', [$auth.user])
        })
        return {
            speedDialMenu,
            showSidebar,
            windowWidth,
            pageHeight,
            mobileSize,
            canCreateProperty,
            canCreateProject,
            canCreateClient
        }
    },
    head() {
        return {
            title: this.$config.app.name
        }
    }
})
</script>
