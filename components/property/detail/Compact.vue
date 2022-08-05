<template>
  <div class="container mx-auto">
    <!-- Image Section -->
    <div class="grid grid-cols-1 lg:grid-cols-6 gap-4 w-full py-4 galleria">
      <div class="max-w-6xl w-full lg:col-span-4">
        <galleria
          :value="images"
          :num-visible="5"
          :circular="true"
          :responsive-options="responsiveOptions"
          :show-item-navigators="true"
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
        <div class="flex flex-wrap -mt-2 mb-10">
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
                <p class="font-bold">{{ $t('property.title.overview') }}</p>
                <div
                  v-if="property.facilities"
                  class="flex flex-wrap space-x-6 text-center text-lg font-semibold"
                >
                  <div>
                    <p class="text-left">{{ $t('common.updated_at') }}</p>
                    <p>{{ formatDateTime(property.updated_at) }}</p>
                  </div>
                  <div>
                    <p>
                      <i class="fa fa-car"></i>
                      {{ $t('facility.electricity_supply') }}
                    </p>
                    <p>{{ property.facilities.electricity_supply || 0 }}</p>
                  </div>
                  <div>
                    <p>
                      <i class="fa fa-bath"></i
                      >{{ $t('facility.water_supply') }}
                    </p>
                    <p>{{ property.facilities.water_supply || 0 }}</p>
                  </div>
                </div>
              </div>
              <div>
                <p class="font-bold">{{ $t('property.title.description') }}</p>
                <property-detail-basic-property-description :item="property" />
              </div>
              <div>
                <p class="font-bold">{{ $t('location.label') }}</p>
                <property-panel-content-location-info :item="property" />
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
          <!-- Right side -->
        </div>
      </div>

      <div class="w-full lg:col-span-2 text-center">
        <h2 class="text-lg font-bold text-primary md:text-2xl">
          {{ $t('common.similar_property') }}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 mt-4">
          <div v-for="item in relatedProperties" :key="item.id">
            <property-card-carousel
              class="mx-2"
              :item="item"
              :img-class="['max-h-48']"
              :options="{ fullscreen: false }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { createHelpers } from 'vuex-map-fields'
import useFormatter from '@/composables/useFormatter'

const { mapFields } = createHelpers({
  getterType: 'listing/getField'
})

export default defineComponent({
  name: 'BasicPropertyDetail',
  setup() {
    const { formatDateTime } = useFormatter()
    return {
      formatDateTime
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
