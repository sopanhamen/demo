<template>
    <main
        class="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative"
    >
        <div class="flex items-start justify-between">
            <!-- <SideBar></SideBar>
            <div class="flex flex-col w-full md:space-y-4">
                <NavBarHome></NavBarHome>
                <nuxt></nuxt>
            </div> -->
        </div>
    </main>
</template>
<script>
import { defineComponent, useContext } from '@vue/composition-api'
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
    }
})
</script>
