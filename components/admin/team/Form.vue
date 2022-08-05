<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
    <panel :header="$t('team.title.info')">
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
        />
        <form-field-input
          v-model="name"
          :label="$t('team.model.name')"
          :placeholder="$t('team.model.name')"
          :errors="v$.name && v$.name.$errors"
          required
        />
      </div>
    </panel>
    <admin-team-form-hierarchy />
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import useCompanyBranch from '@/composables/useCompanyBranch'

const { mapFields } = createHelpers({
  getterType: 'userTeam/getField',
  mutationType: 'userTeam/updateField'
})

export default {
  name: 'AdminTeamForm',
  setup: () => {
    const { branchesOfCompany } = useCompanyBranch()

    return {
      branchesOfCompany,
      v$: useVuelidate()
    }
  },

  validations() {
    return {
      name: {
        required,
        minLength: minLength(2)
      },
      company: { required },
      companyBranch: { required }
    }
  },

  computed: {
    ...mapFields({
      name: 'form.name',
      company: 'form.company_id',
      companyBranch: 'form.company_branch_id',
      users: 'form.users'
    })
  },

  mounted() {
    this.company = this.$auth.user.profile.company_id
  }
}
</script>
