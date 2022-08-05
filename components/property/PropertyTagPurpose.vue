<template>
  <tag
    :class="purposeColor || purposeColors[item.listing_purpose]"
    rounded
    class="px-4"
  >
    {{ $t('listing_purpose.model.' + purposeLabels[item.listing_purpose]) }}
  </tag>
</template>
<script>
import {
  ListingPurposeColor,
  ListingPurposeLabel
} from '@/enums/ListingPurpose'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    purposeColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      purposeColors: ListingPurposeColor,
      purposeLabels: ListingPurposeLabel
    }
  }
}
</script>
