<template>
  <div
    :style="styleList(props)"
    :class="props.classList"
    class="container mx-auto"
  >
    <div class="flex flex-wrap items-center justify-between px-2 pb-1">
      <h2 class="text-3xl text-gray-700">
        {{ listing.label }}
      </h2>
      <div class="text-gray-500">
        <nuxt-link :to="listing.purpose">
          {{ $t('common.see_all') }} <i class="pi pi-arrow-right"></i>
        </nuxt-link>
      </div>
    </div>
    <div class="w-full mt-3 mb-8 px-4 sm:px-0" :class="wrapperClass">
      <div v-for="i in numbersOfItem" :key="i">
        <property-card-carousel
          :item="properties[i - 1]"
          :props="props"
          :card-style="props.style"
        />
      </div>
    </div>
    <empty-item v-if="properties.length === 0" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ListingPurpose } from '@/enums/ListingPurpose'
import useTheme from '@/composables/useTheme'

export default {
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { styleList } = useTheme()
    return { ...ListingPurpose, styleList }
  },

  computed: {
    ...mapState({
      sales: (state) => state.listing.sales,
      rents: (state) => state.listing.rents,
      rentOrSales: (state) => state.listing.rentOrSales
    }),
    numbersOfItem() {
      if (this.props.gridStyle > this.properties?.length) {
        return this.properties?.length
      }

      return this.props.gridStyle || 4
    },
    properties() {
      if (Number(this.props.listingPurpose === ListingPurpose.SALE)) {
        return this.sales?.latests || []
      }

      if (Number(this.props.listingPurpose === ListingPurpose.RENT)) {
        return this.rents?.latests || []
      }

      return this.rentOrSales?.latests || []
    },
    listing() {
      if (Number(this.props.listingPurpose === ListingPurpose.SALE)) {
        return {
          label: this.$t('home.purpose.for_sale.label'),
          purpose: this.linkToProperty(ListingPurpose.SALE)
        }
      }

      if (Number(this.props.listingPurpose === ListingPurpose.RENT)) {
        return {
          label: this.$t('home.purpose.for_rent.label'),
          purpose: this.linkToProperty(ListingPurpose.RENT)
        }
      }

      return {
        label: this.$t('home.purpose.for_rent_or_sale.label'),
        purpose: this.linkToProperty(ListingPurpose.RENT_OR_SALE)
      }
    },
    wrapperClass() {
      if (Number(this.props.gridStyle === 4)) {
        return 'grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
      }

      return 'grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
    }
  },

  methods: {
    linkToProperty(purpose) {
      return this.localePath({
        path: 'properties',
        query: { purpose }
      })
    }
  }
}
</script>
