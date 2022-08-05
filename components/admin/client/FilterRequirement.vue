<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-4">
    <form-field-input
      v-model="model.propertyCode"
      :label="$t('common.property_code')"
      :placeholder="codePrefix + '00001'"
    />
    <form-field-input
      v-model="model.specificPlace"
      :label="$t('location.specific_place')"
    />
    <form-field-input
      v-if="isDefined('purpose')"
      :v-model="model.purpose"
      :value="value.purpose"
      :label="$t('common.purpose')"
      @input="update('purpose', $event)"
    />
    <form-field-select
      v-if="isDefined('priority')"
      v-model="model.priority"
      :options="priorities"
      :label="$t('priority.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
      multiple
      filter
    />
    <form-field-select
      v-if="isDefined('service')"
      v-model="model.service"
      :options="services"
      :label="$t('requirement_service.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
      multiple
      filter
    />
    <form-input-twin
      v-if="isDefined('budget')"
      v-model="budgets"
      :label-first="$t('edit_client.minimum')"
      :label-second="$t('edit_client.maximum')"
      type="number"
    />
    <div class="grid grid-cols-2 gap-x-2">
      <form-field-datepicker
        v-if="isDefined('created_at')"
        v-model="minRequirementDate"
        :manual-input="false"
        :label="$t('client_requirement.min_create_date')"
      />
      <form-field-datepicker
        v-if="isDefined('created_at')"
        v-model="maxRequirementDate"
        :manual-input="false"
        :label="$t('client_requirement.max_create_date')"
      />
    </div>
    <form-field-select
      v-if="isDefined('propertyType')"
      v-model="model.propertyType"
      :options="propertyTypes"
      :label="$t('property_type.title.looking_for')"
      :placeholder="$t('common.select') + '...'"
      option-label="name"
      option-value="id"
      multiple
      filter
    />
    <form-field-select
      v-if="isDefined('country')"
      v-model="model.country"
      :options="countries"
      :label="$t('location.country')"
      :placeholder="$t('common.select') + '...'"
      option-label="name"
      option-value="id"
      multiple
    />
    <form-field-select
      v-if="isDefined('province')"
      v-model="model.province"
      :options="provinces"
      :label="$t('location.province')"
      :placeholder="$t('common.select') + '...'"
      option-label="name_en"
      option-value="id"
      multiple
      filter
    />
    <form-field-select
      v-if="isDefined('district')"
      v-model="model.district"
      :options="districts"
      :label="$t('location.district')"
      :placeholder="$t('common.select') + '...'"
      option-label="name_en"
      option-value="id"
      multiple
      filter
    />
    <form-field-select
      v-if="isDefined('commune')"
      v-model="model.commune"
      :options="communes"
      :label="$t('location.commune')"
      :placeholder="$t('common.select') + '...'"
      option-label="name_en"
      option-value="id"
      multiple
      filter
    />
    <form-field-select
      v-if="isDefined('requirementStatus')"
      v-model="model.requirementStatus"
      :options="requirementSteps"
      :label="$t('requirement_status.title')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
      filter
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isValid, format } from 'date-fns'
import { RequirementStep } from '@/enums/RequirementStep'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      codePrefix: 'CODE-',
      minRequirementDate: null,
      maxRequirementDate: null
    }
  },

  computed: {
    ...mapGetters({
      getCompanyId: 'company/getCompanyById',
      countries: 'country/getCountries',
      getProvinces: 'province/getProvincesByCountry',
      getDistricts: 'district/getDistrictsByProvince',
      getCommunes: 'commune/getCommunesByDistrict',
      propertyTypes: 'propertyType/getPropertyTypes',
      getPriorities: 'resource/getPriorities',
      getServices: 'resource/getRequirementServices'
    }),
    provinces() {
      return this.getProvinces(this.value.country)
    },
    districts() {
      return this.getDistricts(this.value.province)
    },
    communes() {
      return this.getCommunes(this.value.district)
    },
    priorities() {
      return this.getPriorities.map((item) => {
        return {
          value: item.value,
          label: this.$t(`priority.model.${item.label}`)
        }
      })
    },

    requirementSteps() {
      return Object.values(RequirementStep).map((status) => ({
        value: status,
        label: this.$t(`requirement_status.model.${status}`)
      }))
    },

    services() {
      return this.getServices.map((item) => {
        return {
          value: item.value,
          label: this.$t(`requirement_service.model.${item.label}`)
        }
      })
    },
    budgets: {
      get() {
        if (!this.value.budget) {
          return { min: null, max: null }
        }

        const budgets = this.value.budget.split(',')
        const min = budgets[0] ? Number(budgets[0]) : null
        const max = budgets[1] ? Number(budgets[1]) : null

        return { min, max }
      },
      set(value) {
        const min = value.min || ''
        const max = value.max || ''

        this.$emit('input', { ...this.value, budget: min + ',' + max })
      }
    },

    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  watch: {
    minRequirementDate() {
      this.setCreatedAt()
    },
    maxRequirementDate() {
      this.setCreatedAt()
    },
    'value.created_at': {
      handler() {
        if (!this.value?.created_at) {
          this.minRequirementDate = null
          this.maxRequirementDate = null
        }
      }
    }
  },

  mounted() {
    this.company_id = this.$auth.user.profile.company_id
    this.codePrefix = this.getCompanyId(this.company_id).property_code_prefix
  },

  methods: {
    setCreatedAt() {
      const min = this.minRequirementDate
        ? this.formatDate(this.minRequirementDate)
        : ''

      const max = this.maxRequirementDate
        ? this.formatDate(this.maxRequirementDate)
        : ''

      const createdAt = min || max ? min + ',' + max : null
      this.$emit('input', { ...this.value, created_at: createdAt })
    },
    formatDate(value) {
      if (isValid(new Date(value))) {
        return format(new Date(value), 'yyyy-MM-dd')
      }

      return value
    },

    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    },

    isDefined(key) {
      return typeof this.value[key] !== 'undefined'
    }
  }
}
</script>
