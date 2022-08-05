<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 mt-px">
    <form-field-select
      v-show="userCan([CREATE_COMPANY_CLIENT, CREATE_ANY_CLIENT])"
      v-model="companyBranchId"
      :label="$t('company.branch.label')"
      :options="branchesOfCompany(companyId)"
      :errors="v$.companyBranchId && v$.companyBranchId.$errors"
      :show-clear="false"
      option-label="name"
      option-value="id"
      required
      @change="fetchTeamsByBranch(companyBranchId)"
    />

    <form-field-select
      v-show="
        userCan([
          CREATE_BRANCH_CLIENT,
          CREATE_COMPANY_CLIENT,
          CREATE_ANY_CLIENT
        ])
      "
      v-model="teamId"
      :options="teamsOfBranch(companyBranchId)"
      :label="$t('team.label')"
      :errors="v$.teamId && v$.teamId.$errors"
      :show-clear="false"
      option-label="name"
      option-value="id"
      required
      @change="searchUsersByTeam('', $event.value)"
    />
    <form-field-select
      v-show="
        userCan([
          CREATE_TEAM_CLIENT,
          CREATE_BRANCH_CLIENT,
          CREATE_COMPANY_CLIENT,
          CREATE_ANY_CLIENT
        ])
      "
      v-model="assigneeId"
      :options="users"
      :label="$t('client.model.assignee')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.assigneeId && v$.assigneeId.$errors"
      :filter="true"
      option-label="name"
      option-value="id"
      required
      @filter="searchUsers($event)"
    />
    <form-field-select
      v-model="clientSource"
      :options="clientSources"
      :label="$t('client_source.label')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.clientSource && v$.clientSource.$errors"
      :show-clear="false"
      option-label="label"
      option-value="value"
    />
    <form-field-select
      v-model="clientType"
      :options="clientTypes"
      :label="$t('client_type.label')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.clientType && v$.clientType.$errors"
      :show-clear="false"
      option-label="name"
      option-value="id"
    />
  </div>
</template>

<script>
import { debounce, unionBy } from 'lodash'
import { useVuelidate } from '@vuelidate/core'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters, mapMutations } from 'vuex'
import { required } from '@vuelidate/validators'
import { onMounted, useContext } from '@nuxtjs/composition-api'
import { Permission } from '@/enums/Permission'
import useAuth from '@/authorizations/useAuth'
import useUser from '@/composables/useUser'
import useTeam from '@/composables/useTeam'
import useCompanyBranch from '@/composables/useCompanyBranch'

const { mapFields } = createHelpers({
  getterType: 'client/getField',
  mutationType: 'client/updateField'
})

export default {
  name: 'GeneralInformation',

  setup() {
    const { $auth } = useContext()
    const { userCan, isSuperAdmin } = useAuth()
    const { fetchedUsers, searchByTeam } = useUser()
    const { teamsOfBranch, fetchByBranch } = useTeam()
    const { branchesOfCompany } = useCompanyBranch()

    onMounted(() => {
      if ($auth && $auth.user.current_team_id) {
        searchByTeam('', $auth.user.current_team_id)
      }
    })

    return {
      ...Permission,
      fetchedUsers,
      userCan,
      searchUsersByTeam: searchByTeam,
      teamsOfBranch,
      fetchByBranch,
      branchesOfCompany,
      fetchTeamsByBranch: fetchByBranch,
      isSuperAdmin,
      v$: useVuelidate()
    }
  },

  validations() {
    return {
      companyBranchId: {
        required
      },
      teamId: {
        required
      },
      assigneeId: {
        required
      }
    }
  },

  computed: {
    ...mapFields({
      form: 'form',
      companyId: 'form.company_id',
      companyBranchId: 'form.company_branch_id',
      teamId: 'form.team_id',
      assigneeId: 'form.assignee_id',
      clientType: 'form.client_type_id',
      clientSource: 'form.source'
    }),
    ...mapGetters({
      users: 'user/getUsers',
      clientTypes: 'clientType/getPublishedClientTypes',
      getClientSources: 'resource/getClientSources',
      companies: 'company/getCompanies'
    }),
    users() {
      return unionBy(this.fetchedUsers, [this.$auth.user], 'id')
    },
    clientSources() {
      return this.getClientSources.map((source) => {
        return {
          value: source.value,
          label: this.$t(`client_source.model.${source.label}`)
        }
      })
    }
  },

  beforeMount() {
    if (this.isSuperAdmin) {
      if (!this.companyId) {
        this.companyId = this.companies[0].id
      }

      if (!this.companyBranchId) {
        const branches = this.branchesOfCompany(this.companies[0].id)
        this.companyBranchId = branches[0].id
      }
    } else {
      if (!this.companyId && this.$auth.user.profile) {
        this.companyId = this.$auth.user.profile.company_id
      }

      if (!this.companyBranchId) {
        this.companyBranchId = this.$auth.user.profile.company_branch_id
      }

      if (!this.teamId && this.$auth.user.current_team_id) {
        this.teamId = this.$auth.user.current_team_id
      }

      if (!this.assigneeId) {
        this.assigneeId = this.$auth.user.id
      }
    }
  },

  async mounted() {
    await this.searchUsersByTeam('', this.teamId)
    await this.fetchTeamsByBranch()
    if (!this.companyBranchId) {
      const branches = this.branchesOfCompany(this.companies[0].id)
      this.companyBranchId = branches[0].id
    }
  },

  methods: {
    ...mapMutations({
      setUsers: 'user/SET_USERS'
    }),
    searchUsers: debounce(async function (event) {
      if (!event.value) {
        return false
      }

      const users = await this.searchUsersByTeam(event.value, this.teamId)
      return users
    }, 500)
  }
}
</script>
