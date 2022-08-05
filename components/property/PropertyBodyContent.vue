<template>
  <div class="rounded-b-lg relative">
    <div class="px-4 pb-4 space-y-2">
      <div class="absolute -top-12 right-4">
        <property-tag-purpose :item="item" />
      </div>
      <div class="text-sm">
        <property-prices :item="item" />
      </div>
      <div class="flex justify-between">
        <nuxt-link
          :to="localePath('/detail-listing/' + item.id)"
          class="font-semibold text-sm text-gray-800 hover:text-primary-thick"
        >
          {{ item.property_type ? item.property_type.name : 'N/A' }}
        </nuxt-link>
        <p class="font-semibold text-sm text-gray-800">{{ item.code }}</p>
      </div>

      <p class="text-right font-normal text-sm text-gray-600 truncate">
        {{ sizeInfo }}
      </p>
      <p class="text-right font-normal text-sm text-gray-600 truncate">
        {{ buildingInfo }}
      </p>
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import {
  ListingPurposeColor,
  ListingPurposeLabel
} from '@/enums/ListingPurpose'
import useProperty from '@/composables/useProperty'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { i18n } = useContext()
    const { formatLandSize, formatBuildingSize } = useProperty(i18n)

    return { formatLandSize, formatBuildingSize }
  },

  data() {
    return {
      purposeColors: ListingPurposeColor,
      purposeLabels: ListingPurposeLabel
    }
  },

  computed: {
    sizeInfo() {
      return `${this.$t('property.model.land.size')}: ${this.formatLandSize(
        this.item
      )}`
    },
    buildingInfo() {
      return `${this.$t('property.model.building.size')}: ${
        this.formatBuildingSize(this.item) || 'N/A'
      }`
    }
  }
}
</script>
