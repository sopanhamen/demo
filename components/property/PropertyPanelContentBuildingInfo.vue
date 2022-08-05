<template>
  <div>
    <property-panel-content :items="formattedData" />
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import useProperty from '@/composables/useProperty'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { i18n } = useContext()
    const { formatBuildingSize } = useProperty(i18n)

    return {
      formatBuildingSize
    }
  },

  data() {
    return {
      headers: [
        { title: 'number_of_stories', column: 'number_of_stories' },
        { title: 'gross_building_area', column: 'gross_building_area_size' }
      ]
    }
  },

  computed: {
    buildingInfo() {
      return this.headers.map((header) => {
        return {
          title: this.$t('property.model.building.' + header.title),
          value: this.item?.building ? this.item.building[header.column] : ''
        }
      })
    },

    formattedData() {
      if (this.buildingInfo.length > 0) {
        const data = this.buildingInfo
        data.push(this.totalBuildingSize)

        return data
      }

      return [this.totalBuildingSize]
    },

    totalBuildingSize() {
      return {
        title: this.$t('property.model.building.size'),
        value: this.formatBuildingSize(this.item.building)
      }
    }
  }
}
</script>
