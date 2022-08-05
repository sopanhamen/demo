<template>
  <div :class="containerClass">
    <slot name="top"></slot>
    <form-field-select
      v-if="isDefined('country_id')"
      v-show="!hiddenFields.includes('country_id')"
      :value="value.country_id"
      :options="countries"
      :label="$t('location.country')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.value && v$.value.country_id && v$.value.country_id.$errors"
      :required="isRequired('country_id')"
      :input-class="inputClass"
      option-label="name"
      option-value="id"
      @input="update('country_id', $event)"
    />
    <form-field-select
      v-if="isDefined('province_id')"
      v-show="!hiddenFields.includes('province_id')"
      :value="value.province_id"
      :options="provinces"
      :label="$t('location.province')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.value && v$.value.province_id && v$.value.province_id.$errors"
      :required="isRequired('province_id')"
      :input-class="inputClass"
      option-label="name_en"
      option-value="id"
      filter
      @input="update('province_id', $event)"
    />
    <form-field-select
      v-if="isDefined('district_id')"
      v-show="!hiddenFields.includes('district_id')"
      :value="value.district_id"
      :options="districts"
      :label="$t('location.district')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.value && v$.value.district_id && v$.value.district_id.$errors"
      :required="isRequired('district_id')"
      :input-class="inputClass"
      option-label="name_en"
      option-value="id"
      filter
      @input="update('district_id', $event)"
    />
    <form-field-select
      v-if="isDefined('commune_id')"
      :value="value.commune_id"
      :options="communes"
      :label="$t('location.commune')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.value && v$.value.commune_id && v$.value.commune_id.$errors"
      :required="isRequired('commune_id')"
      :input-class="inputClass"
      option-label="name_en"
      option-value="id"
      filter
      @input="update('commune_id', $event)"
    />
    <form-field-select
      v-if="isDefined('direction')"
      :value="value.direction"
      :options="directions"
      :label="$t('direction.label')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.value && v$.value.direction && v$.value.direction.$errors"
      :required="isRequired('direction')"
      :input-class="inputClass"
      option-label="label"
      option-value="value"
      @input="update('direction', $event)"
    />
    <div v-if="isDefined('lat_lng')">
      <admin-dialog-map-picker
        :display.sync="display"
        :lat-lng="value.lat_lng"
        @picked="update('lat_lng', $event)"
      />
      <form-field-input-group
        :value="value.lat_lng"
        :label="$t('location.lat_lng')"
        :errors="v$.value && v$.value.lat_lng && v$.value.lat_lng.$errors"
        placeholder="latitude, longitude"
        position="right"
        icon="pi pi-map-marker"
        color="bg-indigo-600 text-white cursor-pointer"
        @input="update('lat_lng', $event)"
        @click="display = true"
      />
    </div>
    <form-field-input
      v-if="isDefined('village')"
      :value="value.village"
      :label="$t('location.village')"
      :errors="v$.value && v$.value.village && v$.value.village.$errors"
      :input-class="inputClass"
      @input="update('village', $event)"
    />
    <form-field-input
      v-if="isDefined('street')"
      :value="value.street"
      :label="$t('location.street')"
      :errors="v$.value && v$.value.street && v$.value.street.$errors"
      :input-class="inputClass"
      @input="update('street', $event)"
    />
    <form-field-input
      v-if="isDefined('house')"
      :value="value.house"
      :label="$t('location.house')"
      :errors="v$.value && v$.value.house && v$.value.house.$errors"
      :input-class="inputClass"
      @input="update('house', $event)"
    />
    <form-field-input
      v-if="isDefined('floor')"
      :value="value.floor"
      :label="$t('location.floor')"
      :errors="v$.value && v$.value.floor && v$.value.floor.$errors"
      :input-class="inputClass"
      @input="update('floor', $event)"
    />
    <form-field-input
      v-if="isDefined('direct_street')"
      :value="value.direct_street"
      :label="$t('location.direct_street')"
      :errors="
        v$.value && v$.value.direct_street && v$.value.direct_street.$errors
      "
      :input-class="inputClass"
      @input="update('direct_street', $event)"
    />
    <form-field-input
      v-if="isDefined('cornered_with')"
      :value="value.cornered_with"
      :label="$t('location.cornered_with')"
      :errors="
        v$.value && v$.value.cornered_with && v$.value.cornered_with.$errors
      "
      :input-class="inputClass"
      @input="update('cornered_with', $event)"
    />
    <form-field-select
      v-if="isDefined('road_condition')"
      :value="value.road_condition"
      :options="roadConditions"
      :label="$t('location.road_condition')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
      :input-class="inputClass"
      @input="update('road_condition', $event)"
    />
    <form-field-input
      v-if="isDefined('direct_road_width')"
      :value="value.direct_road_width"
      :label="$t('location.direct_road_width')"
      :errors="
        v$.value &&
        v$.value.direct_road_width &&
        v$.value.direct_road_width.$errors
      "
      :input-class="inputClass"
      @input="update('direct_road_width', $event)"
    />
    <slot></slot>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { mapGetters } from 'vuex'
import { Direction, DirectionLabel } from '@/enums/Direction'

export default {
  name: 'AdminFormLocation',
  props: {
    value: {
      type: Object,
      required: true
    },
    validation: {
      type: Object,
      default() {
        return {}
      }
    },
    inputClass: {
      type: [String, Array, Object],
      default: ''
    },
    containerClass: {
      type: [Array, Object, String],
      default: 'grid grid-cols-1 sm:grid-cols-2 gap-4'
    },
    hiddenFields: {
      type: Array,
      default() {
        return []
      }
    }
  },

  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      display: false
    }
  },

  validations() {
    return {
      value: this.validation
    }
  },

  computed: {
    ...mapGetters({
      countries: 'country/getCountries',
      listingRoadConditions: 'resource/getRoadConditions'
    }),
    provinces() {
      return this.$store.getters['province/getProvincesByCountry']([
        this.value.country_id
      ])
    },
    districts() {
      return this.$store.getters['district/getDistrictsByProvince']([
        this.value.province_id
      ])
    },
    communes() {
      return this.$store.getters['commune/getCommunesByDistrict']([
        this.value.district_id
      ])
    },
    directions() {
      return Object.values(Direction).map((direction) => ({
        value: direction,
        label: this.$t('direction.model.' + DirectionLabel[direction])
      }))
    },
    roadConditions() {
      return this.listingRoadConditions.map((roadCondition) => ({
        value: roadCondition.value,
        label: this.$t('road_condition.model.' + roadCondition.label)
      }))
    }
  },

  methods: {
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    },
    isRequired(input) {
      const findRule = Object.entries(this.validation).find(
        ([key, value]) => value.required && key === input
      )
      return findRule ? findRule.length > 0 : false
    },
    isDefined(key) {
      return this.value && typeof this.value[key] !== 'undefined'
    }
  }
}
</script>
