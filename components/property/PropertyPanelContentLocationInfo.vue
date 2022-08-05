<template>
  <div>
    <property-panel-content :items="locationInfo" />
    <map-view
      v-if="location.lat_lng && item.publishing.show_map"
      :lat-lng="location.lat_lng"
      :zoom="18"
    />
  </div>
</template>

<script>
import useLocation from '@/composables/useLocation'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { directionLabel, roadConditionLabel } = useLocation()
    return { directionLabel, roadConditionLabel }
  },

  data() {
    return {
      headers: [
        { title: 'direction', column: 'direction' },
        { title: 'road_condition', column: 'road_condition' },
        { title: 'direct_road_width', column: 'direct_road_width' }
      ]
    }
  },

  computed: {
    location() {
      return this.item?.location || {}
    },
    locationInfo() {
      return this.headers.map((header) => {
        if (!this.item?.location) {
          return {
            title: this.$t('location.' + header.title),
            value: ''
          }
        }

        if (header.title === 'direction') {
          return {
            title: this.$t('location.' + header.title),
            value: this.directionLabel(this.item.location[header.column])
          }
        }

        if (header.title === 'road_condition') {
          return {
            title: this.$t('location.' + header.title),
            value: this.roadConditionLabel(this.item.location[header.column])
          }
        }

        return {
          title: this.$t('location.' + header.title),
          value: this.item.location[header.column]
        }
      })
    }
  }
}
</script>
