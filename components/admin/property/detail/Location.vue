<template>
  <panel :header="$t('location.label')" :toggleable="true">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
      <text-block
        :label="$t('location.country')"
        :description="countryName(property.location.country_id)"
      />
      <text-block
        :label="$t('location.province')"
        :description="provinceName(property.location.province_id)"
      />
      <text-block
        :label="$t('location.district')"
        :description="districtName(property.location.district_id)"
      />
      <text-block
        :label="$t('location.commune')"
        :description="communeName(property.location.commune_id)"
      />
      <text-block
        :label="$t('location.village')"
        :description="property.location.village"
      />
      <text-block
        :label="$t('location.house')"
        :description="property.location.house"
      />
      <text-block
        :label="$t('location.street')"
        :description="property.location.street"
      />

      <text-block
        :label="$t('location.cornered_with')"
        :description="property.location.cornered_with"
      />
      <text-block
        :label="$t('location.cornered_with')"
        :description="property.location.cornered_with"
      />
      <text-block
        :label="$t('location.direction')"
        :description="directionLabel(property.location.direction)"
      />
      <text-block
        :label="$t('location.lat_lng')"
        :description="property.location.lat_lng"
      />
    </div>
    <div v-if="property.location.lat_lng" class="space-y-4">
      <map-view
        :lat-lng="property.location.lat_lng"
        :property="property"
        height="50vmin"
      />
    </div>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import useLocation from '@/composables/useLocation'

export default {
  name: 'AdminPropertyDetailLocation',

  setup() {
    const {
      countryName,
      provinceName,
      districtName,
      communeName,
      directionLabel
    } = useLocation()

    return {
      countryName,
      provinceName,
      districtName,
      communeName,
      directionLabel
    }
  },

  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>
