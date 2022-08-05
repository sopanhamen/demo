<template>
  <pv-dialog
    :show-header="false"
    :visible.sync="isDisplayed"
    :position="position"
    :container-style="{ width: '60vw' }"
    :close-on-escape="true"
    :closable="true"
    :modal="true"
  >
    <gmap-map
      :center="center"
      :zoom="zoom"
      :options="mapOptions"
      map-style-id="roadmap"
      style="width: 100%; height: 60vmin"
    >
      <gmap-marker
        v-if="latLng"
        :position="marker.position"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow()"
      />
      <gmap-info-window
        :options="infoWindowOptions"
        :position="infoWindowPosition"
        :opened="infoWindowOpen"
        :content="infoWindowContent"
      >
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="infoWindowContent"></div>
      </gmap-info-window>
    </gmap-map>
    <template #footer>
      <div class="mt-4 flex justify-end">
        <pv-button
          :label="$t('common.close')"
          class="p-button-text p-button-plain p-button-sm bg-gray-200"
          icon="pi pi-times"
          @click="closeDialog"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import useProperty from '@/composables/useProperty'
import useFormatter from '@/composables/useFormatter'
import { ListingStatus } from '@/enums/ListingStatus'
export default {
  name: 'DialogMapView',
  props: {
    display: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top'
    },
    latLng: {
      type: String,
      default: null
    },
    property: {
      type: Object,
      default: null
    },
    zoom: {
      type: Number,
      default: 16
    }
  },

  setup() {
    const { formatMoney } = useFormatter()
    const {
      formatLandSize,
      formatPriceType,
      hasSalePurpose,
      hasRentPurpose,
      propertyDetailPath
    } = useProperty()

    return {
      formatMoney,
      formatLandSize,
      formatPriceType,
      hasSalePurpose,
      hasRentPurpose,
      propertyDetailPath
    }
  },

  data() {
    return {
      marker: { position: { lat: 11.556644531351306, lng: 104.9282384649147 } },
      center: { lat: 11.556644531351306, lng: 104.9282384649147 },
      ListingStatus,
      mapOptions: {
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false
      },
      infoWindowPosition: {
        lat: 11.556644531351306,
        lng: 104.9282384649147
      },
      infoWindowContent: '',
      infoWindowOpen: false,
      infoWindowOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },

  computed: {
    isDisplayed: {
      get() {
        return this.display
      },
      set(value) {
        this.$emit('update:display', value)
      }
    }
  },

  watch: {
    latLng(value) {
      if (this.latLng) {
        const [lat, lng] = this.latLng.split(',')
        this.marker.position = { lat: parseFloat(lat), lng: parseFloat(lng) }
        this.infoWindowPosition = { lat: parseFloat(lat), lng: parseFloat(lng) }
        this.center = { lat: parseFloat(lat), lng: parseFloat(lng) }
        this.toggleInfoWindow(true)
      }
    }
  },

  methods: {
    closeDialog() {
      this.$emit('update:display', false)
    },
    toggleInfoWindow(open) {
      if (!this.property) {
        return false
      }

      this.infoWindowPosition = this.marker.position
      this.infoWindowContent = this.getInfoWindowContent()
      this.infoWindowOpen = open || !this.infoWindowOpen
    },

    getInfoWindowContent() {
      const link = this.localePath(this.propertyDetailPath(this.property))
      const landSize = this.formatLandSize(this.property.detail)
      let image = ''

      if (this.property.images.length > 0) {
        image = `<div style="margin-bottom: 10px">
          <figure>
            <img src="${this.property.images[0].thumbnail_url}" alt="${this.property.code}" width="210px" >
          </figure>
        </div>`
      }

      let sellingPrice = 'N/A'
      if (this.property.selling_price > 0) {
        sellingPrice = String(
          this.formatMoney(this.property.selling_price, {
            digits: 0
          })
        )

        sellingPrice += this.formatPriceType(this.property.selling_price_type)
      }

      let sellingPriceContent = ''
      if (this.hasSalePurpose(this.property)) {
        sellingPriceContent = ` <p>
          ${this.$t('property.model.selling_price')}:
          <span>${sellingPrice}</span>
        </p>`
      }

      let rentingPrice = 'N/A'
      if (this.property.renting_price > 0) {
        rentingPrice = String(
          this.formatMoney(this.property.renting_price, {
            digits: 0
          })
        )

        rentingPrice += this.formatPriceType(this.property.renting_price_type)
      }

      let rentingPriceContent = ''
      if (this.hasRentPurpose(this.property)) {
        rentingPriceContent = ` <p>
          ${this.$t('property.model.renting_price')}:
          <span>${rentingPrice}</span>
        </p>`
      }

      let viewDetailLink = ''
      // if (
      // this.property.listing_status === ListingStatus.AVAILABLE &&
      // this.property.published &&
      // this.property.published_on_website &&
      // this.property.approved_by
      // ) {
      //
      // }
      viewDetailLink = `<a style="color: #3B82F6" href="${link}" target="_blank" >${this.$t(
        'common.see_more_detail'
      )}</a>`

      if (this.property)
        return `<div>
        ${image}
        <div class="card-content">
          <div class="media">
            <div style="font-size: 14px;">
              <p style="font-weight: 600">
                 <span style="font-weight: bold">${this.property.code}</span>
              </p>
              <p>
                ${this.$t('property.model.land.size')}: <span>${landSize}</span>
              </p>
              ${sellingPriceContent}
              ${rentingPriceContent}
            </div>
          </div>
          <div style="margin-top: 5px">
          ${viewDetailLink}
          </div>
        </div>
      </div>`
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
