<template>
  <div class="gap-4 rounded-md" :class="wrapperClass">
    <form-field-select
      v-model="form.companyBranch"
      :placeholder="$t('company.branch.label') + '...'"
      :value="valueOf('company_branch_id')"
      :options="companyBranches || []"
      option-label="name"
      option-value="id"
      :input-class="['text-base', 'px-2', roundSize]"
      @change="fetchByBranch(form.companyBranch)"
    />
    <form-field-select
      v-model="form.team"
      label=""
      :placeholder="$t('user_team.label') + '...'"
      :value="valueOf('team_id')"
      :options="teamsOfBranch(form.companyBranch)"
      option-label="name"
      option-value="id"
      :input-class="['text-base', 'px-2', roundSize]"
    />
    <form-field-input
      v-model="form.phone"
      label=""
      :placeholder="$t('common.phone') + '...'"
      :input-class="['text-sm', 'pt-3', 'pb-3', 'px-4', roundSize]"
    />
    <form-field-input
      v-model="form.name"
      label=""
      :placeholder="$t('common.name') + '...'"
      :input-class="['text-sm', 'pt-3', 'pb-3', 'px-4', roundSize]"
    />
    <form-field-input
      v-model="form.email"
      label=""
      :placeholder="$t('common.email') + '...'"
      :input-class="['text-sm', 'pt-3', 'pb-3', 'px-4', roundSize]"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import useTeam from '@/composables/useTeam'
import useTheme from '~/composables/useTheme'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    wrapperClass: {
      type: [Object, Array, String],
      default: 'grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2'
    }
  },

  setup() {
    const { fetchByBranch, teamsOfBranch } = useTeam()
    const { roundSize } = useTheme()

    return { fetchByBranch, teamsOfBranch, roundSize }
  },

  computed: {
    ...mapGetters({
      companyBranches: 'companyBranch/getCompanyBranches'
    }),
    form: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
        return value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-inputtext {
  box-shadow: none !important;
}

::v-deep .p-selectbutton {
  .p-button {
    &,
    &:focus,
    &:active {
      outline: none !important;
      border-color: transparent !important;
      box-shadow: none !important;
      padding-top: 0.9rem;
      padding-bottom: 0.9rem;
    }
  }

  .p-button.p-highlight {
    background: #374151 !important;
    color: rgb(250 204 21 / var(--tw-bg-opacity)) !important;
    padding-top: 0.95rem;
    padding-bottom: 0.95rem;

    .p-button-label {
      font-weight: bold !important;
    }
  }
}
</style>
