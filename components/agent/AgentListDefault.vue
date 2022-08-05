<template>
  <div class="container mx-auto min-h-screen">
    <div class="my-8 h-full bg-white p-6 rounded-lg shadow-sm">
      <agent-filter-panel
        v-model="crudOptions.filters"
        @search="fetchItems(crudOptions)"
        @reset="clearFilter"
      />
    </div>

    <div class="container mx-auto mt-10 px-4 lg:px-0">
      <div class="text-2xl">
        <span>{{ fetching ? 0 : paginationMeta.total }} </span>
        <span class="text-base">{{ $t('common.agent') }}</span>
      </div>
      <loader-box v-if="fetching" class="mt-8"></loader-box>
      <template v-else>
        <div class="flex justify-center">
          <empty-item
            v-show="agents.length === 0"
            class="mt-8 w-full"
          ></empty-item>
          <div
            v-if="agents.length > 0"
            class="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full mt-3 mb-8"
          >
            <agent-card-item-default
              v-for="agent in agents"
              :key="agent.id"
              :agent="agent"
            />
          </div>
        </div>
      </template>
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

export default {
  name: 'AgentListDefault',

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

    return {
      crudOptions,
      fetching,
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
