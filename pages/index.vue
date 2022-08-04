<template>
    <div :class="classList" :style="styleList(props)">
        <!-- <loader-box v-if="fetching" />
        <page-body v-else :sections="sections" /> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import { useContext } from '@nuxtjs/composition-api'
import useCrud from '@/composables/useCrud'
import useTheme from '@/composables/useTheme'

const { mapFields } = createHelpers({
    getterType: 'theme/getField',
    mutationType: 'theme/updateField'
})

export default {
    name: 'PageHome',

    setup() {
        const { $service } = useContext()
        const { fetchItems: fetchAgents } = useCrud(
            $service.agent,
            'agentListings'
        )
        const { styleList } = useTheme()

        return { fetchAgents, styleList }
    },

    data() {
        return {
            fetching: true
        }
    },

    fetchDelay() {
        return 500
    },

    async fetch() {
        try {
            await this.fetchSummaries()
            await this.fetchAgents({
                limit: 10,
                counts: ['publishedProperties'],
                relations: ['profile', 'profile.contact', 'teams']
            })
        } catch (error) {
            this.$nuxt.error(error.statusCode, error.message)
        } finally {
            this.fetching = false
        }
    },

    computed: {
        ...mapFields({
            props: 'website.pages.home',
            classList: 'website.pages.home.classList',
            sections: 'website.pages.home.sections'
        })
    },

    methods: {
        ...mapActions({
            fetchSummaries: `listing/fetchSummaries`
        })
    }
}
</script>

<style lang="postcss" scoped>
.button-view-more {
    @apply bg-primary text-gray-600 rounded-lg hover:bg-primary-thick;
    @apply py-1 px-8 border-0 text-center font-bold;
}
</style>
