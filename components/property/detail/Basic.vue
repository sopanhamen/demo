<template>
  <div class="container mx-auto">
    <div class="my-4">
      <property-detail-basic-property-information-card :item="property" />
    </div>
    <!-- Image Section -->

    <div class="grid grid-cols-1 lg:grid-cols-6 gap-4 w-full py-4 galleria">
      <div class="max-w-6xl w-full lg:col-span-4">
        <galleria
          :value="images"
          :num-visible="5"
          :circular="true"
          :responsive-options="responsiveOptions"
          :show-item-navigators="true"
          class="mb-5"
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

        <div class="flex flex-wrap mb-10">
          <!-- Left side -->
          <div class="w-full py-2 space-y-5">
            <!-- <property-info-panel :header="$t('property.title.overview')" :toggleable="false">
                  <template #content>
                    <div v-if="property.facilities" class="flex flex-wrap space-x-6 text-center text-lg font-semibold">
                      <div>
                        <p class="text-left">{{$t('common.updated_at')}}</p>
                        <p>{{formatDateTime(property.updated_at)}}</p>
                      </div>
                      <div>
                        <p><i class="fa fa-car"></i> {{$t('facility.electricity_supply')}}</p>
                      <p>{{property.facilities.electricity_supply || 0}}</p>
                      </div>
                      <div>
                        <p><i class="fa fa-bath"></i>{{$t('facility.water_supply')}}</p>
                        <p>{{property.facilities.water_supply || 0}}</p>
                      </div>
                    </div>
                  </template>
                </property-info-panel> -->

            <!-- <property-info-panel :header="$t('property.title.description')" :toggleable="false">
                  <template #content>
                    <property-detail-basic-property-description :item="property"/>
                  </template>
                </property-info-panel> -->

            <property-info-panel :header="$t('common.general_information')">
              <template #content>
                <property-panel-content :items="basicInfo" />
              </template>
            </property-info-panel>

            <property-info-panel
              :header="$t('property.title.land_description')"
            >
              <template #content>
                <property-panel-content-land-info :item="property" />
              </template>
            </property-info-panel>

            <property-info-panel
              :header="$t('property.title.building_description')"
            >
              <template #content>
                <property-panel-content-building-info :item="property" />
              </template>
            </property-info-panel>

            <property-info-panel
              v-if="otherFacilities.length > 0"
              :header="$t('property.title.facility')"
            >
              <template #content>
                <property-panel-content-facilities-info :item="property" />
              </template>
            </property-info-panel>

            <property-info-panel
              v-if="publishing.description"
              :header="$t('property.title.description')"
            >
              <template #content>
                {{ publishing.description }}
              </template>
            </property-info-panel>

            <property-info-panel :header="$t('location.label')">
              <template #content>
                <property-panel-content-location-info :item="property" />
              </template>
            </property-info-panel>
          </div>
          <!-- Right side -->
        </div>
      </div>

      <div class="w-full lg:col-span-2">
        <agent-contact-form :property="property" :item="property.assignee" />
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
