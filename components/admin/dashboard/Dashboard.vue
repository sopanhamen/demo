<template>
  <div class="space-y-4">
    <div class="flex justify-between">
      <div class="flex space-x-2">
        <select-button
          v-model="listing_type_option"
          :options="listingTypeOptions"
          option-label="name"
          option-value="value"
          @input="onActiveListingTypeChange"
        />
        <calendar
          v-model="filterDate"
          :manual-input="false"
          :placeholder="$t('common.select')"
          class="text-sm"
          date-format="dd/mm/yy"
          selection-mode="range"
          @hide="onFilterDate()"
        />
        <form-field-select
          v-if="canViewCompanyDashboard()"
          v-model="company_branch_id"
          :options="companyBranches"
          :placeholder="$t('company.branch.label') + '...'"
          option-value="id"
          option-label="name"
          @change="onBranchChanged"
        />
        <form-field-select
          v-if="canViewBranchDashboard()"
          v-model="team_id"
          :options="teamsOfBranch(company_branch_id)"
          :placeholder="$t('team.label') + '...'"
          option-value="id"
          option-label="name"
          @change="onTeamChanged"
        />
        <form-field-select
          v-if="canViewTeamDashboard()"
          v-model="user_id"
          :options="users"
          :placeholder="$t('user.label') + '...'"
          :filter="true"
          option-label="name"
          option-value="id"
          @change="fetchAllDashboard"
        />
      </div>
      <div class="flex justify-end">
        <pv-button disabled class="p-button-secondary" icon="pi pi-cog" />
      </div>
    </div>
    <admin-dashboard-quick-indicator />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <admin-dashboard-pie-charts />
      <admin-dashboard-listing-graph />
    </div>
    <admin-dashboard-property-indicator />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <admin-dashboard-company class="h-48" />
        <admin-dashboard-contacts class="h-48" />
        <admin-dashboard-client class="h-48" />
      </div>
      <admin-dashboard-property-price-ranges />
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import authDashboard from '@/authorizations/authDashboard'
import authUser from '@/authorizations/authUser'
import useCompanyBranch from '@/composables/useCompanyBranch'
import useTeam from '@/composables/useTeam'
import useAuth from '~/authorizations/useAuth'
import { ListingOption, ListingOptionLabel } from '@/enums/ListingOption'

const { mapFields } = createHelpers({
  getterType: 'dashboard/getField',
  mutationType: 'dashboard/updateField'
})

export default {
  name: 'AdminDashboard',

  setup() {
    const { branchesOfCompany } = useCompanyBranch()
    const { teamsOfBranch, fetchByBranch } = useTeam()
    const { isSuperAdmin } = useAuth()
    const { canView } = authUser()
    const {
      canViewCompanyDashboard,
      canViewTeamDashboard,
      canViewBranchDashboard
    } = authDashboard()

    return {
      branchesOfCompany,
      teamsOfBranch,
      isSuperAdmin,
      fetchTeamsByBranch: fetchByBranch,
      canView,
      canViewCompanyDashboard,
      canViewTeamDashboard,
      canViewBranchDashboard
    }
  },

  data() {
    return {
      show: true,
      filterDate: null,
      users: [this.$auth.user],
      listingTypeOptions: [
        {
          name: this.$t(`common.${ListingOptionLabel[ListingOption.ALL]}`),
          value: ListingOption.ALL
        },
        {
          name: this.$t(
            `sidebar_menu.${ListingOptionLabel[ListingOption.LISTING]}`
          ),
          value: ListingOption.LISTING
        },
        {
          name: this.$t(
            `sidebar_menu.${ListingOptionLabel[ListingOption.UNLISTING]}`
          ),
          value: ListingOption.UNLISTING
        }
      ]
    }
  },

  async fetch() {
    try {
      this.user_id = !this.isSuperAdmin ? this.$auth.user.id : null
      this.team_id = !this.isSuperAdmin ? this.$auth.user.teams[0]?.id : null
      this.company_branch_id = this.$auth.user.profile?.company_branch_id

      await this.fetchAllDashboard()
      if (this.canView()) {
        await this.fetchUsers()
      }
    } catch (error) {
      console.error(error)
      this.$nuxt.error(error)
    }
  },

  computed: {
    ...mapFields({
      date: 'filters.date',
      user_id: 'filters.user_id',
      team_id: 'filters.team_id',
      company_branch_id: 'filters.company_branch_id',
      listing_type_option: 'filters.listing_type_option'
    }),
    companyBranches() {
      return this.branchesOfCompany(this.$auth.user.profile?.company_id)
    }
  },

  mounted() {
    this.filterDate = this.date.map((d) => new Date(d))
    this.fetchTeamsByBranch(this.company_branch_id)
  },

  methods: {
    ...mapActions({
      fetchAllDashboard: 'dashboard/fetchAllDashboard'
    }),
    async onFilterDate() {
      this.date = this.filterDate
      await this.fetchAllDashboard()
    },
    onActiveListingTypeChange() {
      this.fetchAllDashboard()
    },
    onBranchChanged() {
      this.users = []

      this.user_id = null
      this.team_id = null

      this.fetchAllDashboard()
      this.fetchTeamsByBranch(this.company_branch_id)
    },
    onTeamChanged() {
      this.user_id = null

      this.fetchAllDashboard()
      this.fetchUsers()
    },
    async fetchUsers() {
      if (!this.team_id || !this.company_branch_id) {
        return false
      }

      const { data } = await this.$service.user.get({
        team_id: this.team_id
      })

      this.users = data
    }
  }
}
</script>
