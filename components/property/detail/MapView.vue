<template>
  <div
    class="w-full h-auto lg:h-screen -mt-20 pt-20 mb-5 sm:mb-10 grid lg:grid-cols-2 grid-cols-1"
  >
    <div class="lg:overflow-y-scroll p-10">
      <div class="lg:max grid gap-4 w-full py-2 galleria">
        <div class="max-w-6xl w-full">
          <galleria
            :value="images"
            :num-visible="5"
            :circular="true"
            :responsive-options="responsiveOptions"
            :show-item-navigators="true"
            class="border-2 border-solid"
          >
            <template #item="slotProps">
              <nuxt-img
                :src="slotProps.item.image_url"
                style="width: 100%; max-height: 500px; display: block"
              />
            </template>
            <template #thumbnail="slotProps">
              <nuxt-img
                :src="slotProps.item.thumbnail_url"
                style="display: block; height: 100px"
              />
            </template>
          </galleria>
          <div class="flex flex-wrap mt-2 mb-10">
            <!-- Left side -->
            <div class="w-full py-2">
              <div class="bg-white">
                <property-detail-basic-property-information-card
                  :item="property"
                  purpose-style="md:text-base"
                  property-type-style="md:text-base "
                  title-style="md:text-lg text-base sm:w-10/12 lg:w-8/12"
                  price-style="h-6 md:text-xl text-lg mt-1 pr-6 space-x-2"
                />
              </div>
              <div class="bg-white p-4 sm:p-6 space-y-2">
                <div>
                  <h4 class="font-bold">
                    {{ $t('property.title.overview') }}
                  </h4>
                  <div class="text-left mb-2">
                    {{ $t('property.model.listing_date') }}:
                    {{ formatDate(property.listing_date) }}
                  </div>
                  <div
                    v-if="property.facilities"
                    class="flex flex-wrap space-x-6 text-center text-lg font-semibold"
                  >
                    <div v-if="property.facilities.electricity_supply">
                      <div>
                        <i class="fa fa-car"></i>
                        {{ $t('facility.electricity_supply') }}
                      </div>
                      <div>
                        {{
                          electricitySupplyLabel(
                            property.facilities.electricity_supply
                          )
                        }}
                      </div>
                    </div>
                    <div v-if="property.facilities.water_supply">
                      <p>
                        <i class="fa fa-bath"></i
                        >{{ $t('facility.water_supply') }}
                      </p>
                      <p>
                        {{ waterSupplyLabel(property.facilities.water_supply) }}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="font-bold">
                    {{ $t('property.title.description') }}
                  </p>
                  <property-detail-basic-property-description
                    :item="property"
                  />
                </div>
              </div>
              <div class="w-full">
                <property-detail-basic-agent-contact-form
                  :property="property || {}"
                  :item="property.assignee || {}"
                  class="my-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-128 lg:h-full">
      <map-view
        :lat-lng="latLngProperty"
        :zoom="18"
        map-type="satellite"
        height="100%"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { createHelpers } from 'vuex-map-fields'
import useFormatter from '@/composables/useFormatter'
import useProperty from '@/composables/useProperty'

const { mapFields } = createHelpers({
  getterType: 'listing/getField'
})

export default defineComponent({
  name: 'MapViewPropertyDetail',
  setup() {
    const { formatDate } = useFormatter()
    const { electricitySupplyLabel, waterSupplyLabel } = useProperty()

    return {
      formatDate,
      electricitySupplyLabel,
      waterSupplyLabel
    }
  },

  data() {
    return {
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 5
        },
        {
          breakpoint: '768px',
          numVisible: 3
        },
        {
          breakpoint: '560px',
          numVisible: 2
        }
      ],
      basicHeaders: [
        { title: 'code', column: 'code' },
        { title: 'listing_date', column: 'listing_date' }
      ]
    }
  },

  computed: {
    ...mapFields({
      property: 'displayingListing'
    }),
    basicInfo() {
      return this.basicHeaders.map((header) => {
        return {
          title: this.$t('property.model.' + header.title),
          value: this.property[header.column]
        }
      })
    },
    images() {
      return this.property?.images || []
    },
    otherFacilities() {
      return this.property?.other_facilities || []
    },
    publishing() {
      return this.property?.publishing || {}
    },
    latLngProperty() {
      return this.property?.location?.lat_lng || ''
    },
    relatedProperties() {
      if (
        this.property?.related_properties &&
        this.property?.related_properties.length > 0
      ) {
        return this.property?.related_properties
      }

      return []
    }
  }
})
</script>
<style lang="scss" scoped>
::v-deep .galleria .p-galleria-thumbnail-item {
  all: unset !important;
  margin: 0 10px 10px 0 !important;
}
::v-deep .galleria .p-galleria-thumbnail-items {
  all: unset !important;
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: flex-start !important;
}
::v-deep .galleria .p-galleria-thumbnail-next,
::v-deep .galleria .p-galleria-thumbnail-prev {
  display: none !important;
}
::v-deep .galleria .p-galleria-thumbnail-container {
  padding: 12px 0 0 12px !important;
}
</style>
