<template>
  <div class="grid grid-cols-1">
    <div>
      <chart type="line" :data="lineChart" />
    </div>
    <!-- <div class="border-2 xl:col-span-2"> -->
    <!-- <gmap-map
        ref="propertyMap"
        :center="center"
        :zoom="zoom"
        :options="mapOptions"
        map-style-id="roadmap"
        class="h-96 xl:h-full"
        style="width: 100%; height: 100%"
      >
      </gmap-map> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import useFormatter from '@/composables/useFormatter'

export default {
  props: {
    zoom: {
      type: Number,
      default: 6.6
    }
  },

  setup() {
    const { formatDate } = useFormatter()
    return { formatDate }
  },

  data() {
    return {
      // todo with map
      center: { lat: 12.36644531351306, lng: 104.9282384649147 },
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
  computed: {
    ...mapGetters({
      lineChartData: 'dashboard/getPropertyCountsByDate'
    }),
    lineChart() {
      return {
        labels: this.lineChartData.map((data) => {
          return this.formatDate(data.date)
        }),
        datasets: [
          {
            label: this.$t('dashboard.data_properties'),
            data: this.lineChartData.map(function (data) {
              return data.number_of_properties
            }),
            fill: true,
            tension: 0.2,
            borderColor: '#42A5F5'
          }
        ]
      }
    }
  }
}
</script>

<style>
.progressbar1 .p-progressbar-value {
  background-color: blue !important;
}

.progressbar2 .p-progressbar-value {
  background-color: red !important;
}

.progressbar3 .p-progressbar-value {
  background-color: green !important;
}

.progressbar4 .p-progressbar-value {
  background-color: #c8c81c !important;
}
</style>
