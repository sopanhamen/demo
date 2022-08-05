<template>
  <div :class="containerClass" class="gap-x-5 gap-y-5">
    <form-field-select
      v-model="model.country"
      :options="countries"
      :label="$t('location.country')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.model && v$.model.country && v$.model.country.$errors"
      option-label="name"
      option-value="id"
      filter
    />
    <form-field-select
      v-model="model.province"
      :options="provinces"
      :label="$t('location.province')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.model && v$.model.province && v$.model.province.$errors"
      option-label="name_en"
      option-value="id"
      filter
    />
    <form-field-select
      v-model="model.district"
      :options="districts"
      :label="$t('location.district')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.model && v$.model.district && v$.model.district.$errors"
      option-label="name_en"
      option-value="id"
      filter
    />
    <form-field-select
      v-model="model.commune"
      :options="communes"
      :label="$t('location.commune')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.model && v$.model.commune && v$.model.commune.$errors"
      option-label="name_en"
      option-value="id"
      filter
    />
    <form-field-input v-model="model.village" :label="$t('location.village')" />
    <form-field-input v-model="model.street" :label="$t('location.street')" />
    <form-field-input v-model="model.house" :label="$t('location.house')" />
    <form-field-input
      v-model="model.corneredWith"
      :label="$t('location.cornered_with')"
    />
    <form-field-select
      v-model="model.direction"
      :options="directions"
      :label="$t('direction.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-field-select
      v-model="model.roadCondition"
      :options="roadConditions"
      :label="$t('location.road_condition')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-field-input
      v-model="model.directStreet"
      :label="$t('location.direct_street')"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { useVuelidate } from '@vuelidate/core'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    validations: {
      type: Object,
      default() {
        return {}
      }
    },
    containerClass: {
      type: [String, Array, Object],
      default() {
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }
    }
  },

  setup: () => ({ v$: useVuelidate() }),

  validations() {
    const rules = {}

    if (!this.validations) {
      return {}
    }

    if (this.validations.country_id) {
      rules.country = this.validations.country_id
    }

    if (this.validations.province_id) {
      rules.province = this.validations.province_id
    }

    if (this.validations.district_id) {
      rules.district = this.validations.district_id
    }

    if (this.validations.commune_id) {
      rules.commune = this.validations.commune_id
    }

    return {
      model: rules
    }
  },

  computed: {
    ...mapGetters({
      countries: 'country/getCountries',
      listingDirections: 'resource/getDirections',
      listingRoadConditions: 'resource/getRoadConditions'
    }),
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    directions() {
      return this.listingDirections.map((direction) => ({
        value: direction.value,
        label: this.$t('direction.model.' + direction.label)
      }))
    },
    roadConditions() {
      return this.listingRoadConditions.map((roadCondition) => ({
        value: roadCondition.value,
        label: this.$t('road_condition.model.' + roadCondition.label)
      }))
    },
    provinces() {
      return this.$store.getters['province/getProvincesByCountry']([
        this.value.country
      ])
    },
    districts() {
      return this.$store.getters['district/getDistrictsByProvince']([
        this.value.province
      ])
    },
    communes() {
      return this.$store.getters['commune/getCommunesByDistrict']([
        this.value.district
      ])
    }
  }
}
</script>
