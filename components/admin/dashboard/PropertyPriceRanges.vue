<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="(item, key) in priceRanges"
      :key="key"
      class="bg-white rounded-lg shadow p-5"
    >
      <div class="flex justify-between">
        <div v-if="item.from_price > 0">
          {{ formatMoney(item.from_price) }} -
          {{ formatMoney(item.to_price) }}
        </div>
        <div v-else>
          {{ $t('common.under') }} {{ formatMoney(item.to_price) }}
        </div>
        <div class="font-bold">
          {{ formatNumber(item.number_of_properties) }}
        </div>
      </div>
      <progress-bar
        :value="progressValue(item)"
        :show-value="false"
        style="height: 0.5em"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import useFormatter from '@/composables/useFormatter'

export default {
  setup() {
    const { formatMoney, formatNumber } = useFormatter()
    return { formatMoney, formatNumber }
  },
  computed: {
    ...mapGetters({
      priceRanges: 'dashboard/getPropertyCountsByPriceRange'
    })
  },
  methods: {
    progressValue(item) {
      const highestNumbers = Math.max(
        ...this.priceRanges.map((i) => i.number_of_properties)
      )
      return (item.number_of_properties / highestNumbers) * 100
    }
  }
}
</script>
