<template>
  <div class="bg-white rounded-md relative">
    <div class="overflow-hidden w-full h-full absolute z-40">
      <admin-property-exclusive-ribbon
        v-if="item.publishing && item.publishing.exclusive"
      />
    </div>
    <div class="p-6 w-full z-30 relative">
      <div class="flex flex-wrap justify-between mb-4 gap-y-2">
        <!-- <property-tag-purpose :item="item"  /> -->
        <div class="font-bold flex flex-wrap space-x-2">
          <p class="text-white bg-primary p-2 rounded" :class="purposeStyle">
            {{
              $t('listing_purpose.model.' + purposeLabels[item.listing_purpose])
            }}
          </p>
          <p
            class="text-white bg-primary p-2 rounded"
            :class="propertyTypeStyle"
          >
            {{ propertyType.name }}
          </p>
        </div>
        <property-prices
          :item="item"
          :purposes-sale-style="saleStyle"
          :purposes-rent-style="rentStyle"
          :class="[
            priceStyle,
            { 'mr-16': item.publishing && item.publishing.exclusive }
          ]"
        />
      </div>
      <p :class="titleStyle" class="text-primary font-bold w-full mt-8">
        <span :title="fullAddress(item.location)">
          <i class="pi pi-map-marker"></i> {{ fullAddress(item.location) }}
        </span>
      </p>

      <div class="flex mt-3">
        <span class="text-sm text-gray-600" :title="fullAddress(item.location)">
          {{ `${item.code}` }}
        </span>
      </div>
    </div>

    <div
      class="md:absolute flex justify-end flex-wrap md:bottom-1 md:right-1 space-x-1"
    >
      <div class="relative">
        <pv-button
          icon="pi pi-share-alt"
          class="p-button-text p-button-sm p-button-secondary z-40"
          :label="$t('common.share')"
          :aria-haspopup="true"
          @click="$refs.menu.toggle($event)"
        />
        <pv-menu ref="menu" :model="items" :popup="true" />
      </div>
      <pv-button
        :label="$t('common.favorite')"
        class="p-button-sm p-button-secondary p-button-text"
        icon="pi pi-heart"
        :disabled="true"
      />
      <pv-button
        :label="$t('common.print')"
        class="p-button-sm p-button-secondary p-button-text"
        icon="pi pi-print"
        :disabled="true"
      />
    </div>
  </div>
</template>

<script>
import { useContext, computed } from '@nuxtjs/composition-api'
import useLocation from '@/composables/useLocation'
import useProperty from '@/composables/useProperty'
import { ListingPurposeLabel } from '~/enums/ListingPurpose'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    purposeStyle: {
      type: String,
      default() {
        return 'md:text-md'
      }
    },
    propertyTypeStyle: {
      type: String,
      default() {
        return 'md:text-md'
      }
    },
    titleStyle: {
      type: String,
      default() {
        return 'xl:text-3xl md:text-2xl text-xl sm:w-10/12 lg:w-8/12'
      }
    },
    saleStyle: {
      type: String,
      default() {
        return 'bg-green-100 text-green-800 font-bold px-4 py-2 rounded'
      }
    },
    rentStyle: {
      type: String,
      default() {
        return 'bg-red-100 text-red-800 font-bold px-4 py-2 rounded'
      }
    },
    priceStyle: {
      type: String,
      default() {
        return 'h-10 md:text-3xl mt-1 pr-7 space-x-2 md:space-x-4'
      }
    }
  },

  setup() {
    const { i18n } = useContext()
    const { fullAddress } = useLocation()
    const { formatPriceType } = useProperty(i18n)

    const items = computed(() => [
      {
        label: i18n.t('common.facebook'),
        icon: 'pi pi-facebook',
        command: () => {
          window.open(
            `https://www.facebook.com/sharer.php?u=${window?.location?.href}`,
            '_blank'
          )
        }
      },
      {
        label: i18n.t('common.twitter'),
        icon: 'pi pi-twitter',
        command: () => {
          window.open(
            `https://twitter.com/intent/tweet?text=${window?.location?.href}`,
            '_blank'
          )
        }
      },
      {
        label: i18n.t('whatsapp'),
        icon: 'pi pi-whatsapp',
        command: () => {
          window.open(
            `https://api.whatsapp.com/send?text=${window?.location?.href}`,
            '_blank'
          )
        }
      },
      {
        label: i18n.t('common.email'),
        icon: 'pi pi-envelope',
        command: () => {
          window.open(
            `mailto:email@email.com?subject=${window?.location?.href}
            &body=${window?.location?.href}`,
            '_blank'
          )
        }
      }
    ])
    return {
      items,
      fullAddress,
      formatPriceType
    }
  },

  data() {
    return {
      purposeLabels: ListingPurposeLabel,
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
<style lang="scss" scoped>
::v-deep .p-menu.p-component.p-menu-overlay {
  top: 40px !important;
  left: 0 !important;
}
</style>
