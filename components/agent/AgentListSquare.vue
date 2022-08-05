<template>
  <div class="container mx-auto min-h-screen">
    <div class="mt-10 px-4 lg:px-0">
      <div class="text-2xl">
        <span>{{ fetching ? 0 : paginationMeta.total }} </span>
        <span class="text-base">{{ $t('common.agent') }}</span>
      </div>

      <div class="flex flex-wrap gap-x-6 mt-6 mb-8">
        <div
          :class="roundSize"
          class="bg-white border my-8 h-full p-6 flex-auto lg:flex-none w-full lg:w-80 lg:order-last order-first"
        >
          <agent-filter-panel
            v-model="crudOptions.filters"
            wrapper-class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1"
            button-class="mt-4"
            button-search-class="font-bold text-white bg-primary w-full transition duration-300 hover:shadow-md border-primary"
            button-reset-class="font-bold p-button-text bg-white text-primary w-full hover:text-primary-thick"
            @search="fetchItems(crudOptions)"
            @reset="clearFilter"
          />
        </div>
        <div class="flex-1">
          <loader-box v-if="fetching" class="mt-8"></loader-box>
          <template v-else>
            <empty-item v-show="agents.length === 0" class="mt-8"></empty-item>
            <div
              v-if="agents.length > 0"
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8"
            >
              <agent-card-item-square
                v-for="agent in agents"
                :key="agent.id"
                :agent="agent"
              />
            </div>
          </template>
        </div>
      </div>
      <paginator
        v-show="paginationMeta.total > paginationMeta.per_page"
        :rows="paginationMeta.per_page"
        :total-records="paginationMeta.total"
        class="mb-8"
        @page="changePage"
      />
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import useCrud from '@/composables/useCrud'
import useTheme from '@/composables/useTheme'

export default {
  name: 'AgentListSquare',

  setup() {
    const { route, $service } = useContext()
    const {
      fetching,
      paginationMeta,
      paginationItems,
      fetchItems,
      changePage,
      changeLimit,
      clearFilter
    } = useCrud($service.agent, 'agentListings')

    const crudOptions = {
      limit: 20,
      counts: ['published_properties'],
      relations: ['profile', 'profile.contact', 'teams', 'teams.branch'],
      filters: [
        {
          column: 'company_branch_id',
          value: route.value.query.company_branch_id
        },
        { column: 'team_id', value: route.value.query.team_id },
        { column: 'name', value: route.value.query.name },
        { column: 'position', value: route.value.query.position },
        { column: 'email', value: route.value.query.email },
        { column: 'phone', value: route.value.query.phone }
      ],
      filterOptions: {
        name: 'contain',
        phone: 'contain',
        email: 'contain',
        position: 'contain'
      }
    }

    const { roundSize } = useTheme()

    return {
      roundSize,
      fetching,
      crudOptions,
      paginationMeta,
      paginationItems,
      fetchItems,
      changePage,
      changeLimit,
      clearFilter
    }
  },

  async fetch() {
    try {
      await this.fetchItems(this.crudOptions)
    } catch (error) {
      this.$nuxt.error(error)
    }
  },

  computed: {
    agents() {
      return this.paginationItems.map((agent) => {
        return {
          ...agent
        }
      })
    }
  },

  watch: {
    '$route.query'() {
      this.crudOptions = {
        limit: 20,
        relations: ['profile', 'profile.contact', 'teams', 'teams.branch'],
        filters: [
          {
            column: 'company_branch_id',
            value: this.$route.query.company_branch_id
          },
          { column: 'team_id', value: this.$route.query.team_id },
          { column: 'name', value: this.$route.query.name },
          { column: 'position', value: this.$route.query.position },
          { column: 'email', value: this.$route.query.email },
          { column: 'phone', value: this.$route.query.phone }
        ]
      }
    }
  }
}
</script>
