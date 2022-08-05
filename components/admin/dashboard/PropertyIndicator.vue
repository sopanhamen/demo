<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-3 xl:gap-4 pr-px"
  >
    <div
      v-for="item in propertyIndicator"
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
        <div class="grid grid-cols-4 space-x-5 sm:text-left">
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import useFormatter from '@/composables/useFormatter'

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
    propertyIndicator() {
      return [
        {
          icon: 'pi pi-home',
          textColor: 'text-green-600',
          bgColor: 'bg-green-600/10',
          data: [
            {
              title: this.$t('dashboard.total_approved'),
              value: this.formatNumber(this.propertySummaries.total_approved)
            },
            {
              title: this.$t('dashboard.total_unapproved'),
              value: this.formatNumber(this.propertySummaries.total_unapproved)
            },
            {
              title: this.$t('dashboard.total_published_on_web'),
              value: this.formatNumber(
                this.propertySummaries.total_published_on_web
              )
            }
          ]
        },
        {
          icon: 'pi pi-home',
          textColor: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          data: [
            {
              title: this.$t('dashboard.total_available'),
              value: this.formatNumber(this.propertySummaries.total_available)
            },
            {
              title: this.$t('dashboard.total_sold'),
              value: this.formatNumber(this.propertySummaries.total_sold)
            },
            {
              title: this.$t('dashboard.total_rented'),
              value: this.formatNumber(this.propertySummaries.total_rented)
            }
          ]
        },
        {
          icon: 'pi pi-home',
          textColor: 'text-red-500',
          bgColor: 'bg-red-500/10',
          data: [
            {
              title: this.$t('banner.model.banner_with_stand'),
              value: this.formatNumber(
                this.propertySummaries.total_banner_with_stand
              )
            },
            {
              title: this.$t('banner.model.banner_no_stand'),
              value: this.formatNumber(
                this.propertySummaries.total_banner_no_stand
              )
            },
            {
              title: this.$t('banner.model.no_banner'),
              value: this.formatNumber(this.propertySummaries.total_no_banner)
            },
            {
              title: this.$t('common.unknown'),
              value: this.formatNumber(
                this.propertySummaries.total_banner_unknown
              )
            }
          ]
        }
      ]
    }
  }
}
</script>
