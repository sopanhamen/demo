<template>
  <tag
    :class="statusColor || statusColors[item.listing_status]"
    rounded
    class="px-4"
  >
    {{ $t('listing_status.model.' + statusLabels[item.listing_status]) }}
  </tag>
</template>

<script>
import { ListingStatusColor, ListingStatusLabel } from '@/enums/ListingStatus'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    statusColor: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      statusColors: ListingStatusColor,
      statusLabels: ListingStatusLabel
    }
  }
}
</script>
