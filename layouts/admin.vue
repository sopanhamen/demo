<template>
    <div
        id="admin"
        data-color="default"
        data-font="nunito"
        class="w-full flex-nowrap flex text-sm"
    >
        <toast position="bottom-left" />
        <confirm-dialog />
        <client-only>
            <document-viewer />
        </client-only>

        <admin-sidebar />

        <!-- Main content -->
        <!-- In case mobile screen: Hidden when sidebar is opened -->

        <div
            v-show="windowWidth > mobileSize || !showSidebar"
            class="flex-auto flex-col bg-gray-200 overflow-hidden"
        >
            <admin-navbar />

            <!-- Page content -->
            <main class="p-4 rounded-lg">
                <Nuxt />
            </main>

            <speed-dial
                :model="speedDialMenu"
                :tooltip-options="{ position: 'left' }"
                direction="up"
                class="lg:visible md:visible sm:invisible invisible"
                @show="pageHeight = '500px'"
                @hide="pageHeight = '0px'"
            />
        </div>
    </div>
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
import { MOBILE_SCREEN_SIZE } from '@/static/constant'
import useResource from '@/composables/useResource'
import authProperty from '@/authorizations/authProperty'
import authProject from '@/authorizations/authProject'
import authClient from '@/authorizations/authClient'

export default defineComponent({
    name: 'LayoutAdmin',
    middleware: ['auth', 'authorized', 'team'],

    loading: {
        continuous: true
    },
    setup() {
        const { fetchResources } = useResource()
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

<style lang="scss" scoped>
::v-deep .p-speeddial {
    z-index: 10;

    .p-speeddial-button.p-button.p-button-icon-only {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 99;
    }

    .p-speeddial-list {
        position: fixed;
        bottom: 75px;
        right: 27px;
        z-index: 99;
    }
}
</style>
