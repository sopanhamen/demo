<template>
  <div class="bg-white rounded-md relative">
    <div class="relative overflow-hidden">
      <admin-property-exclusive-ribbon
        v-if="item.publishing && item.publishing.exclusive"
      />
      <div class="p-6 w-full">
        <div class="flex flex-row mb-4">
          <property-tag-purpose :item="item" class="mr-2" />
          <property-prices :item="item" class="space-y-2 mt-1" />
        </div>
        <div class="flex-wrap">
          <div
            class="font-bold xl:text-base lg:text-base md:text-base text-sm text-gray-600 my-1"
            :title="item.code"
          >
            {{ item.code }}
          </div>
          <div
            class="font-bold xl:text-2xl lg:text-2xl md:text-2xl text-xl text-gray-600"
          >
            {{ propertyType.name }}
          </div>
        </div>
        <div class="flex mt-3">
          <i class="pi pi-map-marker"></i>
          <span
            class="text-sm text-gray-600"
            :title="fullAddress(item.location)"
          >
            {{ fullAddress(item.location) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import useLocation from '@/composables/useLocation'
import useProperty from '@/composables/useProperty'
import { ListingPurposeLabel } from '~/enums/ListingPurpose'

export default {
  props: { item: { type: Object, required: true } },

  setup() {
    const { i18n } = useContext()
    const { fullAddress } = useLocation()
    const { formatPriceType } = useProperty(i18n)

    return {
      fullAddress,
      formatPriceType
    }
  },

  data() {
    return {
      purpose: ListingPurposeLabel[this.item.listing_purpose]
    }
  },

  computed: {
    propertyType() {
      return this.item?.property_type || {}
    }
  }
}
</script>
