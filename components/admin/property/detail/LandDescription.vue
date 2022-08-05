<template>
  <panel :header="$t('property.title.land_description')" :toggleable="true">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
      <text-block
        :label="$t('property.model.land.width')"
        :description="valueWithLengthUnit(property.detail.land_width)"
      />
      <text-block
        :label="$t('property.model.land.length')"
        :description="valueWithLengthUnit(property.detail.land_length)"
      />
      <text-block
        :label="$t('property.model.land.size')"
        :description="
          valueWithLengthUnit(
            property.detail.land_size,
            property.detail.land_size_unit
          )
        "
      />
    </div>
    <div
      v-if="isLandPropertyType(property.property_type_id)"
      class="grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 pb-5"
    >
      <text-block
        :label="$t('land_shape.label')"
        :description="landShapeLabel(property.detail.land_shape)"
      />
      <text-block
        :label="$t('zoning.label')"
        :description="zoningLabel(property.detail.zoning)"
      />
      <text-block
        :label="$t('topography.label')"
        :description="topographyLabel(property.detail.topography)"
      />
      <text-block
        :label="$t('sewerage.label')"
        :description="sewerageLabel(property.detail.sewerage)"
      />
      <text-block
        :label="$t('drainage.label')"
        :description="drainageLabel(property.detail.drainage)"
      />
      <text-block
        :label="$t('location_appeal.label')"
        :description="locationAppealLabel(property.detail.location_appeal)"
      />
      <text-block
        :label="$t('property.model.land.current_used')"
        :description="property.detail.current_used"
      />
      <text-block
        :label="$t('property.model.land.surrounding_land_used')"
        :description="property.detail.surrounding_land_used"
      />
    </div>
  </panel>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { mapState } from 'vuex'
import useProperty from '@/composables/useProperty'

export default {
  setup() {
    const { i18n } = useContext()
    const {
      dataSourceLabel,
      drainageLabel,
      isLandPropertyType,
      landShapeLabel,
      listingPurposeLabel,
      locationAppealLabel,
      sewerageLabel,
      topographyLabel,
      valueWithLengthUnit,
      zoningLabel
    } = useProperty(i18n)

    return {
      dataSourceLabel,
      drainageLabel,
      isLandPropertyType,
      landShapeLabel,
      listingPurposeLabel,
      locationAppealLabel,
      sewerageLabel,
      topographyLabel,
      valueWithLengthUnit,
      zoningLabel
    }
  },

  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>
