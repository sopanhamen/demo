<template>
  <div class="flex flex-wrap gap-2">
    <div
      v-if="item.listing_purpose !== purposes.RENT"
      :class="purposesRentStyle"
    >
      {{ item.selling_price | formatMoney({ digits: 0 }) }}
      {{ formatPriceType(item.selling_price_type) }}
    </div>
    <div
      v-if="item.listing_purpose !== purposes.SALE"
      :class="purposesSaleStyle"
    >
      {{ item.renting_price | formatMoney({ digits: 2 }) }}
      {{ formatPriceType(item.renting_price_type) }}
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { ListingPurpose, ListingPurposeLabel } from '@/enums/ListingPurpose'
import { PriceTypeLabel } from '@/enums/PriceType'
import useProperty from '@/composables/useProperty'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    labelClass: {
      type: String,
      default() {
        return 'text-gray-500 font-semibold text-lg text-right truncate'
      }
    },
    purposesSaleStyle: {
      type: String,
      default() {
        return 'bg-red-500 text-white px-2 py-1 rounded-md'
      }
    },
    purposesRentStyle: {
      type: String,
      default() {
        return 'bg-green-500 text-white px-2 py-1 rounded-md'
      }
    }
  },

  setup() {
    const { i18n } = useContext()
    const { formatPriceType } = useProperty(i18n)

    return {
      formatPriceType
    }
  },

  data() {
    return {
      purposeLabel: ListingPurposeLabel,
      purposes: ListingPurpose,
      priceTypeLabel: PriceTypeLabel
    }
  },

  computed: {
    rentPrice() {
      if (!this.item.renting_price) {
        return 'N/A'
      }

      if (this.item.renting_price_type === this.priceTypeLabel.TOTAL) {
        return this.item.renting_price
      }

      return this.item.renting_price + '/' + this.item.renting_price_type
    },

    sellPrice() {
      if (!this.item.selling_price) {
        return 'N/A'
      }

      if (this.item.selling_price_type === this.priceTypeLabel.TOTAL) {
        return this.item.selling_price
      }

      return this.item.selling_price + '/' + this.item.selling_price_type
    }
  }
}
</script>
