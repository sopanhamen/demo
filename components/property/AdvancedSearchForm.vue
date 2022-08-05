<template>
  <div>
    <div :class="wrapperClassList">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-4 mb-4"
      >
        <form-field-select
          v-model="country"
          label=""
          :placeholder="$t('location.country') + '...'"
          :value="valueOf('country_id')"
          :options="countries"
          :input-class="['text-base', 'px-2', roundSize]"
          option-label="name"
          option-value="id"
          @change="update('country_id', $event.value)"
        />
        <form-field-select
          v-model="province"
          label=""
          :placeholder="$t('location.province') + '...'"
          :value="valueOf('province_id')"
          :options="provinces"
          :input-class="['text-base', 'px-2', roundSize]"
          option-label="name_en"
          option-value="id"
          filter
          @change="update('province_id', $event.value)"
        />

        <form-field-select
          v-model="district"
          label=""
          :placeholder="$t('location.district') + '...'"
          :value="valueOf('district_id')"
          :options="districts"
          :input-class="['text-base', 'px-2', roundSize]"
          option-label="name_en"
          option-value="id"
          filter
          @change="update('district_id', $event.value)"
        />

        <form-field-select
          v-model="commune"
          label=""
          :placeholder="$t('location.commune') + '...'"
          :value="valueOf('commune_id')"
          :options="communes"
          :input-class="['text-base', 'px-2', roundSize]"
          option-label="name_en"
          option-value="id"
          filter
          @change="update('commune_id', $event.value)"
        />

        <form-field-select
          v-model="property_type_id"
          label=""
          :placeholder="$t('property_search.property_type')"
          :options="$store.state.propertyType.propertyTypes"
          :input-class="['text-base', 'px-2', roundSize]"
          option-label="name"
          option-value="id"
          filter
          @change="update('property_type_id', $event.value)"
        />

        <form-field-input
          v-model="code"
          label=""
          :placeholder="$t('property_search.property_code') + '...'"
          :input-class="['text-sm', 'pt-3', 'pb-3', 'px-4', roundSize]"
          @input="update('code', $event)"
        />

        <form-field-select
          v-model="direction"
          label=""
          :placeholder="$t('direction.label') + '...'"
          :value="value.direction"
          :options="directions"
          :input-class="['text-base', 'px-2', roundSize]"
          option-label="label"
          option-value="value"
          @change="update('direction', $event.value)"
        />

        <form-field-select
          v-model="road_condition"
          label=""
          :placeholder="$t('road_condition.label') + '...'"
          :value="value.road_condition"
          :options="roadConditions"
          :input-class="['text-base', 'px-2', roundSize]"
          option-label="label"
          option-value="value"
          @change="update('road_condition', $event.value)"
        />

        <template v-if="!($route.query.purpose && $route.query.group)">
          <strong>{{ $t('listing_purpose.label') }}</strong>
          <div
            v-for="purpose of purposes"
            :key="purpose.value"
            class="field-checkbox"
          >
            <checkbox
              :id="purpose.value"
              v-model="listing_purpose"
              :value="purpose.value"
              name="purpose"
              @input="update()"
            />
            <label :for="purpose.value">{{ purpose.label }}</label>
          </div>
        </template>
      </div>

      <div class="mt-2 flex justify-items-stretch gap-x-2">
        <pv-button
          :label="$t('common.reset')"
          :class="roundSize"
          class="p-button-text bg-gray-100 text-gray-700 w-full"
          @click="handleResetButtonClicked"
        />
        <pv-button
          :label="$t('common.search')"
          :class="roundSize"
          class="bg-primary border-primary w-full"
          @click="$emit('search', value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import useTheme from '@/composables/useTheme'

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    wrapperClass: {
      type: [String, Array, Object],
      default: 'p-10'
    }
  },

  setup() {
    const { roundSize } = useTheme()
    return { roundSize }
  },

  data() {
    return {
      listing_purpose: [],
      property_type_id: null,
      code: null,
      country: null,
      province: null,
      district: null,
      commune: null,
      direction: null,
      road_condition: null
    }
  },

  computed: {
    ...mapGetters({
      countries: 'country/getCountries',
      listingPurposes: 'resource/getListingPurposes'
    }),
    provinces() {
      return this.$store.getters['province/getProvincesByCountry']([
        this.country
      ])
    },
    districts() {
      return this.$store.getters['district/getDistrictsByProvince']([
        this.province
      ])
    },
    communes() {
      return this.$store.getters['commune/getCommunesByDistrict']([
        this.district
      ])
    },
    purposes() {
      return this.listingPurposes.map((purpose) => ({
        value: purpose.value,
        label: this.$t('listing_purpose.model.' + purpose.label)
      }))
    },
    directions() {
      const data = this.$store.state.resource.items.direction.map(
        (direction) => ({
          label: this.$t('direction.model.' + direction.label),
          value: direction.value
        })
      )

      return data
    },
    roadConditions() {
      const data = this.$store.state.resource.items.road_condition.map(
        (roadCondition) => ({
          label: this.$t('road_condition.model.' + roadCondition.label),
          value: roadCondition.value
        })
      )
      return data
    },
    wrapperClassList() {
      if (typeof this.wrapperClass === 'object') {
        return { ...this.wrapperClass, [this.roundSize]: true }
      }

      if (Array.isArray(this.wrapperClass)) {
        return [...this.wrapperClass, this.roundSize]
      }

      return this.wrapperClass
    }
  },

  created() {
    this.listing_purpose = [Number(this.valueOf('listing_purpose'))]
    this.property_type_id = this.valueOf('property_type_id')
    this.country = this.valueOf('country_id')
    this.province = this.valueOf('province_id')
    this.district = this.valueOf('district_id')
    this.commune = this.valueOf('commune_id')
  },

  methods: {
    update() {
      this.$emit('input', [
        { column: 'listing_purpose', value: this.listing_purpose },
        { column: 'property_type_id', value: this.property_type_id },
        { column: 'code', value: this.code },
        { column: 'country_id', value: this.country },
        { column: 'province_id', value: this.province },
        { column: 'district_id', value: this.district },
        { column: 'commune_id', value: this.commune },
        { column: 'direction', value: this.direction },
        { column: 'road_condition', value: this.road_condition }
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
      this.listing_purpose = []
      this.property_type_id = null
      this.code = null
      this.country = null
      this.province = null
      this.district = null
      this.commune = null
      this.direction = null
      this.road_condition = null

      this.$emit('input', [])
      this.$emit('reset', event)
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
    background: var(--color-primary) !important;
    color: white !important;
    padding-top: 0.95rem;
    padding-bottom: 0.95rem;

    .p-button-label {
      font-weight: bold !important;
    }
  }
}
</style>
