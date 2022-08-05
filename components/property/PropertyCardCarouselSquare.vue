<template>
  <div class="relative overflow-hidden p-2">
    <div class="bg-white border border-solid">
      <!-- Image carousel -->
      <div>
        <component
          :is="`Property${exclusive.name}`"
          v-if="item.publishing && item.publishing.exclusive"
        />
        <image-carousel
          :images="item.images || []"
          :img-class="imgClass"
          thumbnail-key="thumbnail_url"
          image-key="image_url"
        />
      </div>

      <div class="rounded-b-lg relative">
        <div class="px-4 pb-4 space-y-2">
          <div class="absolute -top-12 left-4">
            <property-tag-purpose
              :item="item"
              class="rounded-none py-1 text-sm px-2 text-white"
              purpose-color="bg-primary"
            />
          </div>
          <div class="flex items-start justify-between">
            <div class="flex flex-wrap gap-x-1">
              <div
                v-if="
                  item.listing_purpose === SALE ||
                  item.listing_purpose === RENT_OR_SALE
                "
                class="text-primary text-lg font-bold"
              >
                {{ formatPrice(item.selling_price, item.selling_price_type) }}
              </div>

              <div
                v-if="
                  item.listing_purpose === RENT ||
                  item.listing_purpose === RENT_OR_SALE
                "
                class="text-primary text-lg font-bold"
              >
                <span
                  v-if="item.listing_purpose === RENT_OR_SALE"
                  class="text-sm"
                >
                  {{ $t('common.or') }}
                </span>
                {{ formatPrice(item.renting_price, item.renting_price_type) }}
              </div>
            </div>

            <h3
              class="flex-none rounded bg-primary-light text-primary text-sm py-1 px-2"
            >
              {{ item.code }}
            </h3>
          </div>
          <div class="flex flex-col gap-y-2">
            <nuxt-link
              :to="localePath('/detail-listing/' + item.id)"
              class="font-semibold text-sm text-gray-800 hover:text-primary-thick"
            >
              {{ item.property_type ? item.property_type.name : 'N/A' }}
            </nuxt-link>
            <p class="font-normal text-sm text-gray-600 truncate">
              {{ $t('property.model.land.size') }}: {{ formatLandSize(item) }}
            </p>
            <p class="font-normal text-sm text-gray-600 truncate">
              {{ $t('property.model.building.size') }}:
              {{ formatBuildingSize(item) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Property Footer -->
      <slot name="footer">
        <div class="border-t-2 border-primary p-4">
          <div class="flex justify-between gap-x-2">
            <div>
              <i class="fa fa-map-marker mr-2 text-primary-thick" />
              <a
                v-if="item.location.lat_lng"
                :href="`http://www.google.com/maps/place/${item.location.lat_lng}`"
                target="_blank"
              >
                <span class="drop-shadow-lg">{{
                  fullAddress(item.location)
                }}</span>
              </a>
              <span v-else class="drop-shadow-lg">{{
                fullAddress(item.location)
              }}</span>
            </div>
            <div class="text-sm text-gray-600">
              <nuxt-link
                :to="localePath('/detail-listing/' + item.id)"
                class="bg-primary-lighter text-primary-thick rounded-full font-bold px-4 py-2 whitespace-nowrap"
              >
                {{ $t('common.view') }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import useProperty from '@/composables/useProperty'
import useLocation from '@/composables/useLocation'
import { ListingPurpose } from '@/enums/ListingPurpose'
import useFormatter from '@/composables/useFormatter'

export default {
  props: {
    props: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    imgClass: {
      type: Array,
      default() {
        return []
      }
    },
    cardStyle: {
      type: Object,
      default() {
        return { name: 'Default', label: 'Default' }
      }
    }
  },

  setup() {
    const { i18n } = useContext()
    const { formatPriceType, formatPrice, formatLandSize, formatBuildingSize } =
      useProperty(i18n)
    const { fullAddress } = useLocation()
    const { formatMoney } = useFormatter()

    return {
      ...ListingPurpose,
      formatPrice,
      formatPriceType,
      formatLandSize,
      formatBuildingSize,
      fullAddress,
      formatMoney
    }
  },

  computed: {
    exclusive() {
      return (
        this.props.exclusive || { name: 'ExclusiveRibbon', label: 'Ribbon' }
      )
    }
  }
}
</script>
