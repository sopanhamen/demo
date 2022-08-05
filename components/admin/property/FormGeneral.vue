<template>
  <panel :header="$t('common.general')" :toggleable="true">
    <div class="grid-container">
      <form-field-input
        v-model="code"
        :label="$t('property.model.code')"
        :errors="v$.code && v$.code.$errors"
        :external-errors="externalErrors.code"
        :readonly="!!approved_by"
        required
        hidden
      />
      <form-field-select
        v-show="
          selectedFormLayout === formLayout.DETAIL &&
          userCan([CREATE_COMPANY_PROPERTY, CREATE_ANY_PROPERTY])
        "
        v-model="company_branch_id"
        :options="branchesOfCompany(company_id)"
        :label="$t('company.branch.label')"
        :errors="v$.company_branch_id && v$.company_branch_id.$errors"
        :show-clear="false"
        option-label="name"
        option-value="id"
        required
        @change="fetchTeamsByBranch(company_branch_id)"
      />
      <form-field-select
        v-show="
          selectedFormLayout === formLayout.DETAIL &&
          userCan([
            CREATE_BRANCH_PROPERTY,
            CREATE_COMPANY_PROPERTY,
            CREATE_ANY_PROPERTY
          ])
        "
        v-model="team_id"
        :options="teamsOfBranch(company_branch_id)"
        :label="$t('team.label')"
        :errors="v$.team_id && v$.team_id.$errors"
        :show-clear="false"
        option-label="name"
        option-value="id"
        required
        @change="searchUsersByTeam('', $event.value)"
      />
      <form-field-select
        v-show="
          selectedFormLayout === formLayout.DETAIL &&
          userCan([
            CREATE_TEAM_PROPERTY,
            CREATE_BRANCH_PROPERTY,
            CREATE_COMPANY_PROPERTY,
            CREATE_ANY_PROPERTY
          ])
        "
        v-model="assignee_id"
        :options="users"
        :label="$t('property.model.assignee')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.assignee_id && v$.assignee_id.$errors"
        :filter="true"
        option-label="name"
        option-value="id"
        @filter="searchUsers($event)"
        @change="setSaleContactByAgent"
      />
      <form-field-input
        v-show="selectedFormLayout == formLayout.DETAIL"
        v-model="valuationReportNumber"
        :label="$t('property.model.valuation_report_number')"
        :errors="v$.valuationReportNumber && v$.valuationReportNumber.$errors"
      />
      <form-field-select
        v-model="developer"
        :options="developers"
        :label="$t('developer.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.developer && v$.developer.$errors"
        option-label="name"
        option-value="id"
        @change="handleDeveloperChanged"
      />
      <form-field-select
        v-model="project"
        :options="projects"
        :label="$t('project.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.project && v$.project.$errors"
        option-label="name"
        option-value="id"
        filter
        @change="handleProjectChanged(project)"
      />
      <form-field-select
        v-model="deedType"
        :options="deedTypes"
        :label="$t('deed_type.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.deedType && v$.deedType.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-input
        v-model="deedNumber"
        :label="$t('property.model.title_deed_number')"
        :errors="v$.deedNumber && v$.deedNumber.$errors"
      />
      <form-field-select
        v-model="banner"
        :options="banners"
        :label="$t('banner.label')"
        :errors="v$.banner && v$.banner.$errors"
        :show-clear="false"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-show="selectedFormLayout === formLayout.DETAIL"
        v-model="dataSource"
        :options="dataSources"
        :label="$t('data_source.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.dataSource && v$.dataSource.$errors"
        option-label="label"
        option-value="value"
      />
    </div>
  </panel>
</template>

<script>
import { debounce, unionBy } from 'lodash'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { createHelpers } from 'vuex-map-fields'
import { onMounted, useContext } from '@nuxtjs/composition-api'
import { required } from '@vuelidate/validators'
import { Permission } from '@/enums/Permission'
import { Banner, BannerLabel } from '@/enums/Banner'
import { FormLayout } from '@/enums/FormLayout'
import useCompanyBranch from '@/composables/useCompanyBranch'
import useTeam from '@/composables/useTeam'
import useUser from '@/composables/useUser'
import useAuth from '@/authorizations/useAuth'
import { Person } from '@/enums/Person'
import useProject from '@/composables/useProject'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  props: {
    externalErrors: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const { $auth } = useContext()
    const { isSuperAdmin, userCan } = useAuth()
    const { branchesOfCompany } = useCompanyBranch()
    const { teamsOfBranch, fetchByBranch } = useTeam()
    const { fetchedUsers, searchByTeam } = useUser()
    const {
      allProjects,
      publishedProjects,
      fetchProjectsByDeveloper,
      projectsOfDeveloper
    } = useProject()

    onMounted(() => {
      if ($auth && $auth.user.current_team_id) {
        searchByTeam('', $auth.user.current_team_id)
      }
    })

    return {
      ...Permission,
      isSuperAdmin,
      branchesOfCompany,
      teamsOfBranch,
      fetchedUsers,
      allProjects,
      publishedProjects,
      fetchProjectsByDeveloper,
      projectsOfDeveloper,
      fetchTeamsByBranch: fetchByBranch,
      searchUsersByTeam: searchByTeam,
      userCan,
      v$: useVuelidate()
    }
  },

  validations() {
    return {
      code: { required }
    }
  },

  data() {
    return {
      formLayout: FormLayout
    }
  },

  computed: {
    ...mapFields({
      propertyId: 'form.id',
      saleContactId: 'form.sale_contact.id',
      saleContactPerson: 'form.sale_contact.contact_person',
      saleContactName: 'form.sale_contact.name',
      saleContactPrimaryPhone: 'form.sale_contact.primary_phone',
      saleContactSecondaryPhone: 'form.sale_contact.secondary',
      saleContactEmail: 'form.sale_contact.email',
      approved_by: 'form.approved_by',
      banner: 'form.banner',
      company_id: 'form.company_id',
      company_branch_id: 'form.company_branch_id',
      code: 'form.code',
      team_id: 'form.team_id',
      selectedFormLayout: 'form.other.form_layout',
      valuationReportNumber: 'form.valuation_report_number',
      developer: 'form.developer_id',
      project: 'form.project_id',
      deedType: 'form.title_deed_type',
      deedNumber: 'form.title_deed_number',
      dataSource: 'form.data_source',
      assignee_id: 'form.assignee_id',
      country_id: 'form.location.country_id',
      province_id: 'form.location.province_id',
      district_id: 'form.location.district_id',
      commune_id: 'form.location.commune_id',
      village: 'form.location.village',
      street: 'form.location.street'
    }),
    ...mapGetters({
      developers: 'developer/getDevelopers',
      getDeedTypes: 'resource/getDeedTypes',
      getDataSources: 'resource/getDataSources',
      companies: 'company/getCompanies'
    }),
    banners() {
      return Object.values(Banner).map((banner) => ({
        value: banner,
        label: this.$t(`banner.model.${BannerLabel[banner]}`)
      }))
    },
    deedTypes() {
      return this.getDeedTypes.map((deedType) => ({
        value: deedType.value,
        label: this.$t('deed_type.model.' + deedType.label)
      }))
    },
    dataSources() {
      return this.getDataSources.map((deedType) => ({
        value: deedType.value,
        label: this.$t('data_source.model.' + deedType.label)
      }))
    },
    users() {
      return unionBy(this.fetchedUsers, [this.$auth.user], 'id')
    },
    projects() {
      if (this.developer) {
        return this.projectsOfDeveloper(this.developer)
      }

      return this.publishedProjects()
    }
  },

  beforeMount() {
    if (this.isSuperAdmin) {
      if (!this.company_id) {
        this.company_id = this.companies[0].id
      }

      if (!this.company_branch_id) {
        const branches = this.branchesOfCompany(this.companies[0].id)
        this.company_branch_id = branches[0].id
      }

      if (!this.team_id) {
        const teams = this.teamsOfBranch(this.company_branch_id)
        this.team_id = teams[0]?.id
      }
    } else {
      if (!this.company_id && this.$auth.user.profile) {
        this.company_id = this.$auth.user.profile.company_id
      }

      if (!this.company_branch_id) {
        this.company_branch_id = this.$auth.user.profile.company_branch_id
      }

      if (!this.team_id && this.$auth.user.current_team_id) {
        this.team_id = this.$auth.user.current_team_id
      }

      if (!this.assignee_id) {
        this.assignee_id = this.$auth.user.id
      }
    }
  },

  async mounted() {
    if (!this.propertyId) {
      this.setSaleContactByAgent({ value: this.$auth.user.id })
    }

    if (!this.code) {
      this.code = this.companies[0].property_code_prefix
    }

    await this.searchUsersByTeam(this.team_id)
    await this.fetchTeamsByBranch()
    if (!this.company_branch_id) {
      const branches = this.branchesOfCompany(this.companies[0].id)
      this.company_branch_id = branches[0].id
    }
  },

  methods: {
    ...mapActions({
      fetchProjects: 'project/fetchProjectsByDeveloper',
      fetchUsers: 'user/fetchUsers'
    }),
    ...mapMutations({
      setUsers: 'user/SET_USERS'
    }),
    handleProjectChanged(event) {
      const project = this.projects.find((p) => p.id === event)

      if (project?.developer_id) {
        this.developer = project.developer_id
      }

      if (project?.country_id) {
        this.country_id = project.country_id
      }

      if (project?.province_id) {
        this.province_id = project.province_id
      }

      if (project?.district_id) {
        this.district_id = project.district_id
      }

      if (project?.commune_id) {
        this.commune_id = project.commune_id
      }

      if (project?.village) {
        this.village = project.village
      }

      if (project?.street) {
        this.street = project.street
      }

      if (project?.direction) {
        this.direction = project.direction
      }
    },
    handleDeveloperChanged(event) {
      this.fetchProjectsByDeveloper(event.value)
    },
    setSaleContactByAgent(event) {
      if (this.saleContactPerson === Person.AGENT) {
        const user = this.users.find((user) => user.id === event.value)
        const contact = user?.profile?.contact || {}
        this.saleContactName = contact?.name || null
        this.saleContactPrimaryPhone = contact?.primary_phone || null
        this.saleContactSecondaryPhone = contact?.secondary_phone || null
        this.saleContactEmail = contact?.email || null
      }
    },
    searchUsers: debounce(async function (event) {
      if (!event.value) {
        return false
      }

      const users = await this.searchUsersByTeam(event.value, this.team_id, {
        relations: 'profile.contact'
      })
      return users
    }, 500)
  }
}
</script>

<style lang="postcss" scoped>
.grid-container {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 mt-px;
}
</style>
