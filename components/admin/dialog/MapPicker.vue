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
    <map-picker
      ref="mapPickerDialog"
      :lat-lng="latLng"
      @marker-dragged="handleMarkerDragged"
      @map-clicked="handleMapClick"
      @map-position-changed="handleMapPositionChanged"
    />
    <template #footer>
      <div class="mt-4 flex justify-between">
        <pv-button
          :label="$t('location.my_location')"
          class="p-button-info p-button-sm"
          icon="pi pi-map-marker"
          @click="useCurrentLocation"
        />
        <div>
          <pv-button
            :label="$t('common.close')"
            class="p-button-text p-button-plain p-button-sm bg-gray-200"
            icon="pi pi-times"
            @click="closeDialog"
          />
          <pv-button
            :label="$t('common.confirm')"
            class="p-button-primary p-button-sm"
            icon="pi pi-check"
            @click="confirm"
          />
        </div>
      </div>
    </template>
  </pv-dialog>
</template>

<script>
export default {
  name: 'DialogMapPicker',
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
    }
  },
  data() {
    return {
      pickedLatLng: null
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
  methods: {
    closeDialog() {
      this.$emit('update:display', false)
    },
    confirm() {
      this.$emit('update:display', false)
      this.$emit('picked', this.pickedLatLng || this.latLng)
    },
    useCurrentLocation() {
      this.$refs.mapPickerDialog.geolocate()
    },
    handleMarkerDragged(e) {
      this.pickedLatLng = e.position.lat + ', ' + e.position.lng
      this.$emit('marker-dragged', e)
    },
    handleMapPositionChanged(e) {
      this.pickedLatLng = e.position.lat + ', ' + e.position.lng
    },
    handleMapClick(e) {
      this.pickedLatLng = e.position.lat + ', ' + e.position.lng
      this.$emit('map-clicked', e)
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
