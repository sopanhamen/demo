<template>
  <div class="space-y-2">
    <p>
      <i class="mr-2 fa-lg fa fa-volume-up text-blue-600"></i>
      {{ propertyType.name }}
      {{ $t('listing_purpose.model.' + purposeLabels[item.listing_purpose]) }}
    </p>
    <p>
      <i class="mr-2 fa-lg fa fa-map-pin text-red-600"></i
      >{{ fullAddress(item.location) }}
    </p>
    <p class="flex items-center">
      <i class="mr-2 fa-lg fa fa-usd text-green-600"></i>
      <property-prices
        :item="item"
        purposes-sale-style=" "
        purposes-rent-style=" "
      />
    </p>
    <p>
      <i class="mr-2 fa-lg fa fa-play text-blue-600"></i
      >{{ $t('common.road') }}:{{ item.land.direct_road_width || '' }}
    </p>
    <p>
      <i class="mr-2 fa-lg fa fa-play text-blue-600"></i>
      {{ $t('common.land_size') }}: {{ item.land.land_width || '' }} m x
      {{ item.land.land_length || '' }} m
    </p>
    <p>
      <i class="mr-2 fa-lg fa fa-play text-blue-600"></i>
      {{ $t('facility.electricity_supply') }}
      {{ item.facilities.electricity_supply || '' }} ,
      {{ $t('facility.water_supply') }} {{ item.facilities.water_supply || '' }}
    </p>
    <p>
      <i class="mr-2 fa-lg fa fa-play text-blue-600"></i>
      {{ deedTypeLabel(item.title_deed_type) }}
    </p>
    <p>
      <span class="text-red-500">!!</span
      >{{ item.publishing.description || '' }}
    </p>
    <p>
      <i class="mr-2 fa-lg fa fa-phone text-red-500"></i
      >{{ `${$t('common.more_info')} : ${item.assignee.phone || ''}` }}
    </p>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { ListingPurposeLabel } from '~/enums/ListingPurpose'
import useLocation from '@/composables/useLocation'
import useProperty from '@/composables/useProperty'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { fullAddress } = useLocation()
    const { i18n } = useContext()
    const { deedTypeLabel, listingPurposeLabel } = useProperty(i18n)
    return {
      fullAddress,
      deedTypeLabel,
      listingPurposeLabel
    }
  },

  data() {
    return {
      purposeLabels: ListingPurposeLabel
    }
  },

  computed: {
    propertyType() {
      return this.item?.property_type || {}
    }
  }
}
</script>
