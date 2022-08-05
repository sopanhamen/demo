<template>
  <div class="container mx-auto">
    <!-- Image Section -->
    <div class="w-full mt-10">
      <image-carousel
        :images="images"
        :animate3-d="true"
        :display="3"
        image-class="drop-shadow-lg rounded-lg"
        image-key="image_url"
        thumbnail-key="image_url"
        width="800"
        height="540"
      />
    </div>

    <div class="flex flex-wrap mb-10">
      <!-- Left side -->
      <div class="w-full lg:w-8/12 pr-0 py-2 lg:pr-4 space-y-5">
        <div class="my-4">
          <property-information-card :item="property" />
        </div>

        <property-info-panel :header="$t('common.general_information')">
          <template #content>
            <property-panel-content :items="basicInfo" />
          </template>
        </property-info-panel>

        <property-info-panel :header="$t('property.title.land_description')">
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
      <div class="w-full lg:w-4/12 pl-0 py-2 lg:pl-4">
        <!-- {{ property.assignee }} -->
        <agent-contact-form
          :property="property || {}"
          :item="property.assignee || {}"
          class="my-4"
        />
        <h2 class="text-lg font-bold text-primary text-center md:text-2xl">
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
import { defineComponent } from '@nuxtjs/composition-api'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'listing/getField'
})

export default defineComponent({
  data() {
    return {
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
