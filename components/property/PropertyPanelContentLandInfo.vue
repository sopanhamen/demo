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
    const { formatLandSize } = useProperty(i18n)

    return {
      formatLandSize
    }
  },

  data() {
    return {
      landHeaders: [
        { title: 'current_used', column: 'current_used' },
        { title: 'surrounding_land_used', column: 'surrounding_land_used' }
      ]
    }
  },

  computed: {
    landInfo() {
      return this.landHeaders.map((header) => {
        return {
          title: this.$t('property.model.land.' + header.title),
          value: this.item?.land ? this.item?.land[header.column] : ''
        }
      })
    },

    formattedData() {
      const data = this.landInfo
      data.push(this.totalLandSize)

      return data
    },

    totalLandSize() {
      return {
        title: this.$t('property.model.land.size'),
        value: this.formatLandSize(this.item.land)
      }
    }
  }
}
</script>
