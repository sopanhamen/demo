<template>
  <panel :header="$t('team.label')" :toggleable="true">
    <div class="space-y-4">
      <form-field-select
        v-model="companyBranch"
        :options="branchesOfCompany(company)"
        :label="$t('company.branch.label')"
        :errors="v$.companyBranch && v$.companyBranch.$errors"
        :show-clear="false"
        option-label="name"
        option-value="id"
        required
        @change="fetchByBranch($event.value)"
      />
      <div
        v-for="(team, key) in userTeams"
        :key="key"
        class="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <form-field-select
          :value="team.team_id"
          :options="teamsOfBranch(companyBranch)"
          :label="$t('team.label')"
          :errors="
            v$.userTeams && v$.userTeams.$each.$response.$errors[key].team_id
          "
          :show-clear="false"
          option-label="name"
          option-value="id"
          required
          @input="updateTeam(key, { ...team, team_id: $event })"
        />
        <form-field-select
          :value="team.level"
          :options="positions"
          :label="$t('team.model.level')"
          :errors="
            v$.userTeams && v$.userTeams.$each.$response.$errors[key].level
          "
          :show-clear="false"
          option-label="label"
          option-value="level"
          required
          @input="updateTeam(key, { ...team, level: $event })"
        />
      </div>
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { TeamPosition, TeamPositionLabel } from '@/enums/User'
import useCompanyBranch from '@/composables/useCompanyBranch'
import useTeam from '@/composables/useTeam'

const { mapFields } = createHelpers({
  getterType: 'user/getField',
  mutationType: 'user/updateField'
})

export default {
  name: 'AdminUserFormTeam',
  setup: () => {
    const { branchesOfCompany } = useCompanyBranch()
    const { fetchByBranch, teamsOfBranch } = useTeam()

    return {
      branchesOfCompany,
      teamsOfBranch,
      fetchByBranch,
      v$: useVuelidate()
    }
  },

  validations() {
    return {
      company: { required },
      companyBranch: { required },
      userTeams: {
        $each: helpers.forEach({
          team_id: { required },
          level: { required }
        })
      }
    }
  },

  data() {
    return {
      positions: Object.values(TeamPosition).map((position) => ({
        level: position,
        label:
          position +
          ' - ' +
          this.$t('team_position.model.' + TeamPositionLabel[position])
      }))
    }
  },

  computed: {
    ...mapFields({
      company: 'form.profile.company_id',
      companyBranch: 'form.profile.company_branch_id',
      userTeams: 'form.teams'
    })
  },

  async mounted() {
    await this.fetchByBranch(this.companyBranch)
    this.company = this.company || this.$auth.user?.profile?.company_id
  },

  methods: {
    updateTeam(key, team) {
      const teams = [...this.userTeams]
      teams[key] = team
      this.$store.commit('user/UPDATE_USER_FORM', { teams })
    }
  }
}
</script>
