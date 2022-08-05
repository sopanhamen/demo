<template>
  <div :class="containerClass" class="gap-x-5 gap-y-4">
    <form-field-input
      v-model="model.code"
      :label="$t('property.model.code')"
      :placeholder="propertyCode"
    />
    <form-field-select
      v-model="model.property_type_id"
      :options="propertyTypes"
      :label="$t('property_type.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="name"
      option-value="id"
      filter
    />
    <form-field-select
      v-model="model.developer_id"
      :options="developers"
      :label="$t('developer.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="name"
      option-value="id"
      filter
      @change="handleDeveloperChanged($event)"
    />
    <form-field-select
      v-model="model.project_id"
      :options="projects"
      :label="$t('project.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="name"
      option-value="id"
      :filter="true"
      @filter="searchProjects($event)"
      @change="onProjectChanged($event)"
    />
    <div class="grid grid-cols-2 gap-x-2">
      <form-field-datepicker
        v-model="minListingDate"
        :manual-input="false"
        :label="$t('property_search.min_start_listing_date')"
      />
      <form-field-datepicker
        v-model="maxListingDate"
        :manual-input="false"
        :label="$t('property_search.max_start_listing_date')"
      />
    </div>
    <form-field-input
      v-model="model.valuation_report_number"
      :label="$t('property.model.valuation_report_number')"
    />
    <form-field-select
      v-model="model.company_branch_id"
      :options="branchesOfCompany(companyId)"
      :label="$t('company.branch.label')"
      :placeholder="$t('common.select') + '...'"
      :show-clear="true"
      option-value="id"
      option-label="name"
      @change="onBranchChanged"
    />
    <form-field-select
      v-model="model.team_id"
      :options="teamsOfBranch(model.company_branch_id)"
      :label="$t('user_team.label')"
      :placeholder="$t('common.select') + '...'"
      :show-clear="true"
      option-value="id"
      option-label="name"
      @change="searchUsersByTeam('', model.team_id)"
    />
    <form-field-select
      v-model="model.assignee_id"
      :options="users"
      :label="$t('common.agent')"
      :placeholder="$t('common.select') + '...'"
      :filter="true"
      option-label="name"
      option-value="id"
      @filter="searchUsers($event)"
    />
    <form-field-select
      v-model="model.exclusive"
      :options="[
        { label: $t('common.exclusive'), value: true },
        { label: $t('common.inclusive'), value: false }
      ]"
      :label="$t('common.exclusive')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
  </div>
</template>

<script>
import { debounce, unionBy } from 'lodash'
import { mapGetters } from 'vuex'
import { isValid, format } from 'date-fns'
import { computed, useContext, useStore } from '@nuxtjs/composition-api'
import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'
import useCompanyBranch from '@/composables/useCompanyBranch'
import useTeam from '@/composables/useTeam'
import useUser from '@/composables/useUser'
import useProject from '@/composables/useProject'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    containerClass: {
      type: [String, Array, Object],
      default() {
        return 'grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5'
      }
    }
  },

  setup() {
    const { branchesOfCompany } = useCompanyBranch()
    const { teamsOfBranch, fetchByBranch } = useTeam()
    const { searchUser, fetchedUsers, searchByTeam } = useUser()
    const { userCan } = useAuth()
    const {
      allProjects,
      publishedProjects,
      fetchProjectsByDeveloper,
      projectsOfDeveloper,
      searchProject
    } = useProject()

    const { $auth } = useContext()
    const { getters } = useStore()
    const companies = getters['company/getCompanies']
    const companyId = computed(() => {
      return $auth.user?.profile.company_id && companies[0]?.id
    })

    return {
      ...Permission,
      companyId,
      userCan,
      branchesOfCompany,
      teamsOfBranch,
      searchUser,
      searchProject,
      fetchedUsers,
      fetchTeamsByBranch: fetchByBranch,
      searchUsersByTeam: searchByTeam,
      allProjects,
      publishedProjects,
      fetchProjectsByDeveloper,
      projectsOfDeveloper
    }
  },

  data() {
    return {
      minListingDate: null,
      maxListingDate: null
    }
  },

  computed: {
    ...mapGetters({
      propertyTypes: 'propertyType/getPropertyTypes',
      developers: 'developer/getDevelopers',
      users: 'user/getUsers',
      companies: 'company/getCompanies'
    }),
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    users() {
      const selectedAgent = this.$store.state.user.users?.find(
        (user) => user.id === this.model.assignee_id
      )

      if (selectedAgent) {
        return unionBy(
          this.fetchedUsers,
          [selectedAgent],
          [this.$auth.user],
          'id'
        )
      }

      return unionBy(this.fetchedUsers, [this.$auth.user], 'id')
    },
    propertyCode() {
      const routeName = this.$route.path.split('/').pop()
      if (routeName === 'exclusives' || routeName === 'listings') {
        const digits = this.companies[0]?.property_code_digit
        const prefix = this.companies[0]?.property_code_prefix
        return prefix + '1'.padStart(digits, '0')
      }

      const digits = this.companies[0]?.property_code_digit_unlisting
      const prefix = this.companies[0]?.property_code_prefix_unlisting

      return prefix + '1'.padStart(digits, '0')
    },
    projects() {
      if (this.model.developer_id) {
        return this.projectsOfDeveloper(this.model.developer_id)
      }

      return this.publishedProjects()
    }
  },

  watch: {
    minListingDate() {
      const min = this.minListingDate
        ? this.formatDate(this.minListingDate)
        : ''
      const max = this.maxListingDate
        ? this.formatDate(this.maxListingDate)
        : ''
      this.$emit('input', { ...this.value, listing_date: min + ',' + max })
    },
    maxListingDate() {
      const min = this.minListingDate
        ? this.formatDate(this.minListingDate)
        : ''
      const max = this.maxListingDate
        ? this.formatDate(this.maxListingDate)
        : ''
      this.$emit('input', { ...this.value, listing_date: min + ',' + max })
    },
    model() {
      if (!this.model?.listing_date) {
        this.minListingDate = null
        this.maxListingDate = null
      }
    }
  },
  methods: {
    formatDate(value) {
      if (isValid(new Date(value))) {
        return format(new Date(value), 'yyyy-MM-dd')
      }

      return value
    },

    handleDeveloperChanged(event) {
      this.fetchProjectsByDeveloper(event.value)
    },
    onProjectChanged(event) {
      const projectId = event.value
      const project = this.projects.find((i) => i.id === projectId)
      if (project) {
        this.model.developer_id = project.developer_id
      }
    },
    onBranchChanged() {
      this.model.assignee_id = null
      this.model.team_id = null
      this.fetchTeamsByBranch(this.model.company_branch_id)
    },
    searchUsers: debounce(async function (event) {
      if (!event.value) {
        return false
      }

      if (this.model.team_id) {
        const users = await this.searchUsersByTeam(
          event.value,
          this.model.team_id
        )
        return users
      }

      const users = await this.searchUser(event.value)
      return users
    }, 300),
    searchProjects: debounce(async function (event) {
      if (!event.value) {
        return false
      }

      if (this.model.developer) {
        const projects = await this.fetchProjectsByDeveloper(
          event.value,
          this.model.developer
        )
        return projects
      }

      const projects = await this.searchProject(event.value)
      return projects
    }, 300)
  }
}
</script>
