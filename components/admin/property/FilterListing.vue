<template>
  <div class="gap-x-5 gap-y-5" :class="containerClass">
    <form-field-select
      v-model="model.listingPurpose"
      :options="purposes"
      :label="$t('listing_purpose.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-input-twin
      v-model="prices"
      :label-first="$t('common.from_price')"
      :label-second="$t('common.to_price')"
      placeholder-first="120000"
      placeholder-second="120000"
      type="number"
    />
    <form-input-twin
      v-model="landSizes"
      :label-first="$t('property.model.land.size_min')"
      :label-second="$t('property.model.land.size_max')"
      type="number"
    />
    <form-field-select
      v-model="model.dataSource"
      :options="dataSources"
      :label="$t('data_source.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-field-input
      v-model="model.titleDeedNumber"
      :label="$t('property.model.title_deed_number')"
      type="number"
      placeholder="120000"
    />
    <form-field-select
      v-model="model.titleDeedType"
      :options="TitleDeedTypes"
      :label="$t('deed_type.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    containerClass: {
      type: [String, Array, Object],
      default() {
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }
    }
  },
  computed: {
    ...mapGetters({
      listingPurposes: 'resource/getListingPurposes',
      listingDataSources: 'resource/getDataSources',
      listingTitleDeedTypes: 'resource/getDeedTypes'
    }),
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    prices: {
      get() {
        if (!this.value.sellingPrices) {
          return { min: null, max: null }
        }

        const prices = this.value.sellingPrices.split(',')
        const min = prices[0] ? Number(prices[0]) : null
        const max = prices[1] ? Number(prices[1]) : null

        return { min, max }
      },
      set(value) {
        const min = value.min || ''
        const max = value.max || ''

        this.$emit('input', { ...this.value, sellingPrices: min + ',' + max })
      }
    },
    landSizes: {
      get() {
        if (!this.value.landSizes) {
          return { min: null, max: null }
        }

        const landSizes = this.value.landSizes.split(',')
        const min = landSizes[0] ? Number(landSizes[0]) : null
        const max = landSizes[1] ? Number(landSizes[1]) : null

        return { min, max }
      },
      set(value) {
        const min = value.min || ''
        const max = value.max || ''

        this.$emit('input', { ...this.value, landSizes: min + ',' + max })
      }
    },
    purposes() {
      return this.listingPurposes.map((purpose) => ({
        value: purpose.value,
        label: this.$t('listing_purpose.model.' + purpose.label)
      }))
    },
    dataSources() {
      return this.listingDataSources.map((dataSource) => ({
        value: dataSource.value,
        label: this.$t('data_source.model.' + dataSource.label)
      }))
    },
    TitleDeedTypes() {
      return this.listingTitleDeedTypes.map((TitleDeedType) => ({
        value: TitleDeedType.value,
        label: this.$t('deed_type.model.' + TitleDeedType.label)
      }))
    }
  }
}
</script>
