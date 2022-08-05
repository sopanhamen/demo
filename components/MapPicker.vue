<template>
  <gmap-map
    ref="mapRef"
    :center="center"
    :zoom="zoom"
    :options="mapOptions"
    map-style-id="roadmap"
    style="width: 100%; height: 60vmin"
    @click="handleMapClick"
  >
    <gmap-marker
      :position="marker.position"
      :clickable="true"
      :draggable="true"
      @drag="handleMarkerDrag"
      @click="panToMarker"
    />
  </gmap-map>
</template>

<script>
export default {
  props: {
    zoom: {
      type: Number,
      default: 16
    },
    latLng: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      marker: { position: { lat: 11.556644531351306, lng: 104.9282384649147 } },
      center: { lat: 11.556644531351306, lng: 104.9282384649147 },
      mapOptions: {
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false
      }
    }
  },

  created() {
    if (this.latLng) {
      const [lat, lng] = this.latLng.split(',')
      this.marker.position = { lat: parseFloat(lat), lng: parseFloat(lng) }
      this.center = { lat: parseFloat(lat), lng: parseFloat(lng) }
    }
  },

  mounted() {
    if (!this.latLng || this.latLng === '') {
      this.geolocate()
    }
  },

  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        this.$emit('map-position-changed', this.marker)
        this.panToMarker()
      })
    },

    // sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      this.$emit('marker-dragged', this.marker)
    },

    // Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position)
    },

    // Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() }
      this.$emit('map-clicked', this.marker)
    }
  }
}
</script>
