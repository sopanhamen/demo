<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
    <form-field-input
      v-model="model.name"
      :label="$t('person.name')"
      :placeholder="$t('person.name')"
    />
    <form-field-select
      v-model="model.clientSource"
      :options="clientSources"
      :label="$t('client_source.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-field-select
      v-model="model.clientType"
      :options="clientTypes"
      :label="$t('client_type.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="name"
      option-value="id"
    />
    <form-field-select
      v-if="userCan(Permission.VIEW_COMPANY_CLIENT)"
      v-model="model.companyBranchId"
      :options="branchesOfCompany(model.companyId)"
      :label="$t('company.branch.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="name"
      option-value="id"
      @change="onBranchChanged"
    />
    <form-field-select
      v-if="
        userCan([Permission.VIEW_COMPANY_CLIENT, Permission.VIEW_BRANCH_CLIENT])
      "
      v-model="model.teamId"
      :options="teamsOfBranch(model.companyBranchId)"
      :label="$t('user_team.label')"
      :placeholder="$t('common.select') + '...'"
      :show-clear="true"
      option-value="id"
      option-label="name"
      @change="searchUsersByTeam('', model.teamId)"
    />
    <form-field-select
      v-model="model.assigneeId"
      :options="users"
      :label="$t('common.assignee')"
      :placeholder="$t('common.select') + '...'"
      :filter="true"
      option-label="name"
      option-value="id"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce, unionBy } from 'lodash'
import useCompanyBranch from '@/composables/useCompanyBranch'
import useTeam from '@/composables/useTeam'
import useUser from '@/composables/useUser'
import authClient from '@/authorizations/authClient'
import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { branchesOfCompany } = useCompanyBranch()
    const { teamsOfBranch, fetchByBranch } = useTeam()
    const { searchUser, fetchedUsers, searchByTeam } = useUser()
    const { canView } = authClient()
    const { userCan } = useAuth()

    return {
      branchesOfCompany,
      fetchTeamsByBranch: fetchByBranch,
      teamsOfBranch,
      searchUsersByTeam: searchByTeam,
      searchUser,
      fetchedUsers,
      canView,
      userCan,
      Permission
    }
  },

  async fetch() {
    await this.searchUsersByTeam('', this.model.teamId)
  },

  computed: {
    ...mapGetters({
      clientTypes: 'clientType/getPublishedClientTypes',
      getClientSources: 'resource/getClientSources'
    }),
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    clientSources() {
      return this.getClientSources.map((clientSource) => ({
        value: clientSource.value,
        label: this.$t(`client_source.model.${clientSource.label}`)
      }))
    },
    users() {
      if (!this.model.teamId) {
        return [this.$auth.user]
      }

      return unionBy([this.$auth.user], this.fetchedUsers, 'id')
    }
  },
  methods: {
    onBranchChanged() {
      this.model.assigneeId = null
      this.model.teamId = null
      this.fetchTeamsByBranch(this.model.companyBranchId)
    },
    searchUsers: debounce(async function (event) {
      if (!event.value) {
        return false
      }
      if (this.teamId) {
        const users = await this.searchUsersByTeam(
          event.value,
          this.model.teamId,
          {
            relations: 'profile.contact'
          }
        )
        return users
      }
      const users = await this.searchUser(event.value)
      return users
    }, 500)
  }
}
</script>
