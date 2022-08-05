<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 pr-px"
  >
    <div
      v-for="item in quickIndicator"
      :key="item.id"
      class="transition relative duration-300 ease-in-out hover:scale-105 transform w-full drop-shadow-sm rounded-md bg-white"
    >
      <div class="flex p-5 space-x-5">
        <div class="py-2 px-3 rounded-lg" :class="item.bgColor">
          <i
            class="text-2xl sm:text-4xl"
            :class="' ' + item.textColor + ' ' + item.icon"
          />
        </div>
        <div class="grid grid-cols-2 space-x-5 sm:text-left">
          <div v-for="subItem of item.data" :key="subItem.id">
            <div class="font-medium text-gray-500">
              {{ subItem.title }}
            </div>
            <div class="text-xl font-semibold">
              {{ subItem.value }}
            </div>
          </div>
        </div>
      </div>
      <!-- <button
        class="absolute bottom-0 text-center w-full bg-gray-800 rounded-b bg-opacity-20 py-1"
      >
        <p class="opacity-100">
          {{ $t('dashboard.more_info') }}
          <i class="fa fa-arrow-circle-right" />
        </p>
      </button> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import useFormatter from '@/composables/useFormatter'
import { ListingOption, ListingOptionLabel } from '@/enums/ListingOption'

const { mapFields } = createHelpers({
  getterType: 'dashboard/getField',
  mutationType: 'dashboard/updateField'
})

export default {
  setup() {
    const { formatMoney, formatNumber } = useFormatter()
    return { formatMoney, formatNumber }
  },

  computed: {
    ...mapGetters({
      propertySummaries: 'dashboard/getPropertySummaries'
    }),
    ...mapFields({
      listing_type_option: 'filters.listing_type_option'
    }),
    quickIndicator() {
      return [
        {
          icon: 'pi pi-home',
          textColor: 'text-indigo-600',
          bgColor: 'bg-indigo-600/10',
          data: [
            {
              title: this.getTotalLabel(),
              value: this.formatNumber(this.propertySummaries.total_properties)
            },
            {
              title: this.$t('dashboard.total_exclusives'),
              value: this.formatNumber(this.propertySummaries.total_exclusives)
            }
          ]
        },
        {
          icon: 'pi pi-dollar',
          textColor: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          data: [
            {
              title: this.$t('dashboard.total_expired'),
              value: this.formatNumber(this.propertySummaries.total_expired)
            },
            {
              title: this.$t('dashboard.total_expired_value'),
              value: this.formatMoney(
                this.propertySummaries.total_expired_value
              )
            }
          ]
        },
        {
          icon: 'pi pi-dollar',
          textColor: 'text-green-600',
          bgColor: 'bg-green-600/10',
          data: [
            {
              title: this.$t('dashboard.total_selling_value'),
              value: this.formatMoney(
                this.propertySummaries.total_selling_value
              )
            },
            {
              title: this.$t('dashboard.total_sold_value'),
              value: this.formatMoney(this.propertySummaries.total_sold_value)
            }
          ]
        },
        {
          icon: 'pi pi-dollar',
          textColor: 'text-red-500',
          bgColor: 'bg-red-500/10',
          data: [
            {
              title: this.$t('dashboard.total_renting_value'),
              value: this.formatMoney(
                this.propertySummaries.total_renting_value
              )
            },
            {
              title: this.$t('dashboard.total_rented_value'),
              value: this.formatMoney(this.propertySummaries.total_rented_value)
            }
          ]
        }
      ]
    }
  },

  methods: {
    getTotalLabel() {
      switch (ListingOptionLabel[this.listing_type_option]) {
        case ListingOptionLabel[ListingOption.ALL]:
          return this.$t('dashboard.total_properties')
        case ListingOptionLabel[ListingOption.LISTING]:
          return this.$t('dashboard.total_listing')
        case ListingOptionLabel[ListingOption.UNLISTING]:
          return this.$t('dashboard.total_unlisting')
      }
    }
  }
}
</script>
