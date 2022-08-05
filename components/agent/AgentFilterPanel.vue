<template>
  <div>
    <form @submit.prevent="$emit('search', value)">
      <agent-filter v-model="form" :wrapper-class="wrapperClass" />
      <div :class="buttonClass">
        <pv-button
          :label="$t('common.search')"
          :class="buttonSearchClassList"
          type="submit"
        />
        <pv-button
          :label="$t('common.reset')"
          :class="buttonResetClass"
          type="button"
          @click="handleResetButtonClicked"
        />
      </div>
    </form>
  </div>
</template>

<script>
import useTheme from '@/composables/useTheme'

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    wrapperClass: {
      type: [Object, Array, String],
      default: 'grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 grid-cols-1'
    },
    buttonClass: {
      type: [Object, Array, String],
      default: ''
    },
    buttonSearchClass: {
      type: [Object, Array, String],
      default:
        'w-32 my-4 font-bold text-white bg-primary bg-primary hover:shadow-md border-primary'
    },
    buttonResetClass: {
      type: [Object, Array, String],
      default:
        'w-32 my-4 p-button-text text-primary bg-white hover:text-primary-thick'
    }
  },

  setup() {
    const { roundSize } = useTheme()
    return { roundSize }
  },

  data() {
    return {
      form: {
        companyBranch: null,
        teams: null,
        team: null,
        name: null,
        phone: null,
        email: null
      }
    }
  },

  computed: {
    buttonSearchClassList() {
      if (typeof this.buttonSearchClass === 'object') {
        return { ...this.buttonResetClass, [this.roundSize]: true }
      }

      if (Array.isArray(this.buttonSearchClass)) {
        return [...this.buttonSearchClass, this.roundSize]
      }

      return this.buttonSearchClass + ' ' + this.roundSize
    }
  },

  watch: {
    form: {
      deep: true,
      handler(value) {
        this.update(value)
      }
    }
  },

  created() {
    this.form.companyBranch = this.valueOf('company_branch_id')
    this.form.team = this.valueOf('team_id')
    this.form.name = this.valueOf('name')
    this.form.phone = this.valueOf('phone')
    this.form.email = this.valueOf('email')
  },

  methods: {
    update(value) {
      this.$emit('input', [
        { column: 'company_branch_id', value: value.companyBranch },
        { column: 'team_id', value: value.team },
        { column: 'name', value: value.name },
        { column: 'phone', value: value.phone },
        { column: 'email', value: value.email }
      ])
    },
    valueOf(column) {
      const filter = this.value.find((i) => i.column === column)
      if (!filter || !filter.value) {
        return null
      }

      return filter.value
    },
    handleResetButtonClicked(event) {
      this.form.companyBranch = null
      this.form.team = null
      this.form.name = null
      this.form.phone = null
      this.form.email = null

      this.$emit('input', [])
      this.$emit('reset', event)
    }
  }
}
</script>

<style lang="scss" scoped>
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
