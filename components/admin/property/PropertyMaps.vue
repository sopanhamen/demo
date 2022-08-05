<template>
  <div class="rounded-lg bg-white">
    <slot name="header">
      <div class="flex justify-end space-x-2 py-3 px-4"></div>
    </slot>
    <client-only>
      <gmap-map
        ref="propertyMap"
        :center="center"
        :zoom="zoom"
        :options="mapOptions"
        :style="{ width: '100%', height: height }"
        map-style-id="roadmap"
        @zoom_changed="$emit('zoom_changed', $event)"
        @center_changed="$emit('center_changed', $event)"
      >
        <gmap-marker
          v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :clickable="true"
          :draggable="false"
          :icon="marker.icon"
          @click="toggleInfoWindow(marker)"
        />
        <gmap-info-window
          :options="infoWindowOptions"
          :position="infoWindowPosition"
          :opened="infoWindowOpen"
          :content="infoWindowContent"
          @closeclick="infoWindowOpen = false"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="infoWindowContent"></div>
        </gmap-info-window>
      </gmap-map>
    </client-only>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
import useProperty from '@/composables/useProperty'

export default {
  name: 'AdminPropertiesMapView',
  props: {
    properties: {
      type: Array,
      default() {
        return []
      }
    },
    zoom: {
      type: Number,
      default: 14
    },
    centeredProperty: {
      type: Object,
      default() {
        return {}
      }
    },
    height: {
      type: [Number, String],
      default: '80vmin'
    }
  },

  setup() {
    const {
      isBuildingPropertyType,
      isBusinessPropertyType,
      isLandPropertyType,
      findCenteredProperty,
      formatLandSize,
      formatPriceType,
      hasSalePurpose,
      hasRentPurpose,
      propertyDetailPath
    } = useProperty()

    return {
      isBuildingPropertyType,
      isBusinessPropertyType,
      isLandPropertyType,
      findCenteredProperty,
      formatLandSize,
      formatPriceType,
      hasSalePurpose,
      hasRentPurpose,
      propertyDetailPath
    }
  },

  data() {
    return {
      center: { lat: 11.556644531351306, lng: 104.9282384649147 },

      infoWindowPosition: {
        lat: 11.556644531351306,
        lng: 104.9282384649147
      },
      infoWindowContent: '',
      infoWindowOpen: false,
      infoWindowOptions: {
        pixelOffset: {
          width: 1,
          height: -50
        }
      },

      propertyTypeFile: {
        homes: 'homes',
        lands_plots: 'lands_plots',
        commercial: 'commercial',
        business: 'business',
        industrial: 'industrial',
        petrol_station: 'petrol_station'
      },

      listingType: {
        listing: 'listing',
        unlisting: 'unlisting',
        exclusive: 'exclusive'
      }
    }
  },

  computed: {
    mapOptions() {
      const options = {
        zoomControl: true,
        minZoom: 8,
        maxZoom: 18,
        zoomControlOptions: { position: 3 },
        mapTypeControl: true,
        mapTypeControlOptions: { position: 3 },
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false
      }

      if (!gmapApi || !gmapApi()) {
        return options
      }

      return {
        ...options,
        zoomControlOptions: {
          position: gmapApi().maps.ControlPosition.TOP_RIGHT
        },
        mapTypeControlOptions: {
          position: gmapApi().maps.ControlPosition.TOP_RIGHT
        }
      }
    },
    markers() {
      if (!this.properties || this.properties.length === 0) {
        return []
      }

      try {
        return this.properties
          .filter((item) => !!item.location.lat_lng)
          .map((property) => {
            const [lat, lng] = property.location.lat_lng.split(',')

            const icon = this.markerIcon(property)

            return {
              ...property,
              position: { lat: parseFloat(lat), lng: parseFloat(lng) },
              icon
            }
          })
      } catch (error) {
        console.error('ERROR PROPERTIES', this.properties)
        return []
      }
    }
  },

  watch: {
    centeredProperty() {
      if (this.centeredProperty && this.centeredProperty.location.lat_lng) {
        const [lat, lng] = this.centeredProperty.location.lat_lng.split(',')
        this.center = { lat: parseFloat(lat), lng: parseFloat(lng) }
        this.panTo(this.center)
      }
    }
  },

  methods: {
    async toggleInfoWindow(prop) {
      const { data: property } = await this.$service.property.find(prop.id, {
        relations: 'images'
      })

      this.infoWindowPosition = prop.position
      this.infoWindowContent = this.getInfoWindowContent(property)
      this.infoWindowOpen = !this.infoWindowOpen
    },

    panTo(position) {
      this.$refs.propertyMap.$mapPromise.then((map) => {
        map.panTo(position)
      })
    },

    getInfoWindowContent(property) {
      if (!property) {
        return ''
      }

      const link = this.localePath(this.propertyDetailPath(property))
      const landSize = this.formatLandSize(property.detail)
      let image = ''

      if (property.images.length > 0) {
        image = `<div style="margin-bottom: 10px">
          <figure>
            <img src="${property.images[0].thumbnail_url}" alt="${property.code}" width="210px" >
          </figure>
        </div>`
      }

      let sellingPrice = 'N/A'
      if (property.selling_price > 0) {
        sellingPrice = String(
          this.$options.filters.formatMoney(property.selling_price, {
            digits: 0
          })
        )

        sellingPrice +=
          ' / ' + this.formatPriceType(property.selling_price_type)
      }

      let sellingPriceContent = ''
      if (this.hasSalePurpose(property)) {
        sellingPriceContent = ` <p>
          ${this.$t('property.model.selling_price')}:
          <span>${sellingPrice}</span>
        </p>`
      }

      let rentingPrice = 'N/A'
      if (property.renting_price > 0) {
        rentingPrice = String(
          this.$options.filters.formatMoney(property.renting_price, {
            digits: 0
          })
        )

        rentingPrice +=
          ' / ' + this.formatPriceType(property.renting_price_type)
      }

      let rentingPriceContent = ''
      if (this.hasRentPurpose(property)) {
        rentingPriceContent = ` <p>
          ${this.$t('property.model.renting_price')}:
          <span>${rentingPrice}</span>
        </p>`
      }

      return `<div>
        ${image}
        <div class="card-content">
          <div class="media">
            <div style="font-size: 14px;">
              <p style="font-weight: 600">
                <span style="font-weight: bold">${property.code}</span>
              </p>
              <p>
                ${this.$t('property.model.land.size')}: <span>${landSize}</span>
              </p>
              ${sellingPriceContent}
              ${rentingPriceContent}
            </div>
          </div>
          <div style="margin-top: 5px">
             <a style="color: #3B82F6" href="${link}" target="_blank">${this.$t(
        'common.see_more_detail'
      )}</a>
          </div>
        </div>
      </div>`
    },
    markerIcon(property) {
      let icon = '/icon'

      // Get listing type folder name
      let type = this.listingType.unlisting
      if (property.published) {
        type = property.exclusive
          ? this.listingType.exclusive
          : this.listingType.listing
      }
      icon += `/${type}`

      // Get property type group folder name
      let group = this.propertyTypeFile.homes
      if (this.isLandPropertyType(property.property_type_id)) {
        group = this.propertyTypeFile.lands_plots
      } else if (this.isBusinessPropertyType(property.property_type_id)) {
        group = this.propertyTypeFile.business
      }

      icon += `/${group}`
      icon += '.png'

      return icon
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-dialog {
  .p-dialog-content {
    padding: 0 !important;
    border-top-right-radius: 0.375rem;
    border-top-left-radius: 0.375rem;
  }
}
</style>
