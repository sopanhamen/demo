<template>
  <form @submit.prevent="handleSearch">
    <panel :header="$t('common.filter')" :toggleable="true">
      <div :class="classContainer">
        <form-field-select
          v-model="company_branch_id"
          :options="branchesOfCompany(company)"
          :label="$t('company.branch.label')"
          :show-clear="true"
          option-value="id"
          option-label="name"
        />
        <form-field-input v-model="name" :label="$t('team.model.name')" />
      </div>
      <div class="mt-3 flex justify-end sm:space-x-3">
        <pv-button
          :label="$t('common.search')"
          icon="pi pi-search"
          class="p-button-sm"
          type="submit"
        />
        <pv-button
          :label="$t('common.clear')"
          icon="pi pi-replay"
          class="p-button-sm p-button-danger"
          @click="handleResetSearch"
        />
      </div>
    </panel>
  </form>
</template>

<script>
import { createHelpers } from 'vuex-map-fields'
import useCompanyBranch from '@/composables/useCompanyBranch'

const { mapFields } = createHelpers({
  getterType: 'user/getField',
  mutationType: 'user/updateField'
})

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    classContainer: {
      type: String,
      default() {
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-5'
      }
    }
  },

  setup: () => {
    const { branchesOfCompany } = useCompanyBranch()

    return {
      branchesOfCompany
    }
  },

  data() {
    return {
      name: null
    }
  },

  computed: {
    ...mapFields({
      company: 'form.profile.company_id',
      company_branch_id: 'form.profile.company_branch_id'
    }),
    companyBranches() {
      return this.getCompanyBranches(this.$auth.user.profile.company_id)
    }
  },

  mounted() {
    this.company = this.company || this.$auth.user?.profile?.company_id
  },

  methods: {
    update() {
      this.$emit('input', [
        { column: 'name', value: this.name },
        { column: 'company_branch_id', value: this.company_branch_id }
      ])
    },
    handleSearch() {
      this.update()
      this.$emit('search', true)
    },
    handleResetSearch() {
      this.name = null
      this.company_branch_id = null

      this.update()
      this.$emit('reset', true)
    }
  }
}
</script>
