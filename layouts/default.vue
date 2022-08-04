<template>
    <main id="theme" class="relative h-screen flex flex-col text-base">
        <!-- <theme-loader v-if="!loaded" /> -->
        <div v-if="loaded" :data-color="color" :data-font="font || 'nunito'">
            <!-- <component :is="navbar.name" :items="items" /> -->

            <div class="flex-grow pt-20">
                <nuxt />
            </div>

            <!-- <component :is="footer.name" /> -->
            <!-- <button-scroll-to-top /> -->
        </div>
    </main>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import {
    onBeforeMount,
    onMounted,
    ref,
    useStore
} from '@nuxtjs/composition-api'
import { mapGetters } from 'vuex'
import useResource from '@/composables/useResource'
import useMenu from '@/composables/useMenu'

const { mapFields } = createHelpers({
    getterType: 'theme/getField'
})

export default {
    name: 'LayoutDefault',

    setup() {
        const { fetchResources } = useResource()
        const { dispatch } = useStore()

        const loading = ref(true)
        const fetching = ref(true)

        onBeforeMount(async () => {
            const theme = await dispatch('theme/getTheme')
            if (theme) {
                fetching.value = false

                setTimeout(function () {
                    loading.value = false
                }, 500)
            }
        })

        onMounted(async () => {
            await fetchResources()
        })

        const { WEBSITE_MENU_ITEMS } = useMenu()

        return {
            loading,
            fetching,
            items: WEBSITE_MENU_ITEMS
        }
    },

    head() {
        return {
            title: this.$config.app.name
        }
    },

    computed: {
        ...mapFields({
            font: 'website.font',
            color: 'website.color',
            navbar: 'website.navbar',
            footer: 'website.footer'
        }),
        ...mapGetters({
            companies: 'company/getCompanies'
        }),
        loaded() {
            return !this.loading && this.companies && this.companies.length
        }
    }
}
</script>
