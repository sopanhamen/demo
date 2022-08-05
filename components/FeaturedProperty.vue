<template>
  <div
    :style="styleList(props)"
    :class="props.classList"
    class="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 mt-10 px-2"
  >
    <div
      v-for="(property, index) in properties"
      :key="property.id"
      :class="{ 'hidden sm:block': index == 1 }"
    >
      <div
        v-if="property.images && property.images.length > 0"
        class="w-full rounded-lg overflow-hidden featured-property-image"
        :style="{
          backgroundImage: `url(${property.images[0].image_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        }"
      >
        <div class="h-full flex items-center text-center bg-yellow-400/10">
          <div
            class="relative flex flex-col mx-auto text-black bg-white/80 rounded-lg h-52 sm:w-96 px-3 md:px-8 py-4"
          >
            <div>{{ property.code }}</div>
            <div class="my-2 min-w-24 text-xl">
              <div v-if="property.listing_purpose === SALE">
                {{
                  formatPrice(
                    property.selling_price,
                    property.selling_price_type
                  )
                }}
              </div>
              <div v-if="property.listing_purpose === RENT">
                {{
                  formatPrice(
                    property.renting_price,
                    property.renting_price_type
                  )
                }}
              </div>
              <div v-if="property.listing_purpose === RENT_OR_SALE">
                {{ $t('listing_purpose.model.rent_or_sale') }}:
                {{
                  formatPrice(
                    property.selling_price,
                    property.selling_price_type
                  )
                }}
                <span class="text-base"> {{ $t('common.or') }}</span>
                {{
                  formatPrice(
                    property.renting_price,
                    property.renting_price_type
                  )
                }}
              </div>
            </div>
            <div>{{ formatLandSize(property) }}</div>
            <div class="mb-4">{{ fullAddress(property.location) }}</div>
            <nuxt-link
              :to="localePath('/detail-listing/' + property.id)"
              class="absolute left-1/2 bottom-3 bg-primary hover:shadow-lg hover:bg-primary-thick text-white w-2/3 p-2 rounded-lg transform -translate-x-1/2"
            >
              {{ $t('common.detail') }} <i class="pi pi-arrow-right"></i>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ListingPurpose } from '@/enums/ListingPurpose'
import useProperty from '@/composables/useProperty'
import useLocation from '@/composables/useLocation'
import useTheme from '@/composables/useTheme'

export default {
  props: {
    props: {
      type: [Array, Object],
      required: true
    }
  },

  setup() {
    const { styleList } = useTheme()
    const { fullAddress } = useLocation()
    const { formatLandSize, formatPrice } = useProperty()

    return {
      ...ListingPurpose,
      formatLandSize,
      formatPrice,
      fullAddress,
      styleList
    }
  },

  computed: {
    ...mapState({
      featured: (state) => state.listing.featured
    }),
    properties() {
      return this.featured || []
    }
  }
}
</script>

<style>
.featured-property-image {
  height: 50vw !important;
}

@media (min-width: 640px) {
  .featured-property-image {
    height: 30vw !important;
  }
}
@media (min-width: 768px) {
  .featured-property-image {
    height: 25vw !important;
  }
}
</style>
