<template>
  <panel :header="$t('property.title.building_description')" :toggleable="true">
    <div v-if="property" class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
      <text-block
        :label="$t('property.model.building.width')"
        :description="property.detail.building_width"
      />
      <text-block
        :label="$t('property.model.building.length')"
        :description="property.detail.building_length"
      />
      <text-block
        :label="$t('property.model.building.number_of_stories')"
        :description="property.detail.number_of_stories"
      />
      <text-block
        :label="$t('property.model.building.gross_building_area')"
        :description="property.detail.gross_building_area_size"
      />
      <text-block
        :label="$t('property.model.building.main_wall')"
        :description="wallMaterialLabel(property.detail.building_main_wall)"
      />
      <text-block
        :label="$t('ceiling.label')"
        :description="ceilingLabel(property.detail.ceiling)"
      />
      <text-block
        :label="$t('flooring_material.label')"
        :description="flooringMaterialLabel(property.detail.flooring_material)"
      />
      <text-block
        :label="$t('roofing.label')"
        :description="roofingLabel(property.detail.roofing)"
      />
      <text-block
        :label="$t('window_frame.label')"
        :description="windowFrameLabel(property.detail.window_frame)"
      />
      <text-block
        :label="$t('design_appeal.label')"
        :description="designAppealLabel(property.detail.design_appeal)"
      />
      <text-block
        :label="$t('property.model.building.year_of_construction')"
        :description="property.detail.year_of_construction"
      />
      <text-block
        :label="$t('property.model.building.estimated_years_usable')"
        :description="property.detail.estimated_years_usable"
      />
      <text-block
        :label="$t('property.model.building.actual_age')"
        :description="property.detail.actual_age"
      />
      <text-block
        :label="$t('property.model.building.effective_age')"
        :description="property.detail.effective_age"
      />
      <text-block
        :label="$t('property.model.building.estimated_cost')"
        :description="property.detail.estimated_cost"
      />
      <text-block
        :label="$t('property.model.building.number_of_mezzanines')"
        :description="property.detail.number_of_mezzanines"
      />
      <text-block
        :label="$t('property.model.building.number_of_bedrooms')"
        :description="property.detail.number_of_bedrooms"
      />
      <text-block
        :label="$t('property.model.building.number_of_bathrooms')"
        :description="property.detail.number_of_bathrooms"
      />
    </div>
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import useProperty from '@/composables/useProperty'

export default {
  setup() {
    const {
      wallMaterialLabel,
      ceilingLabel,
      flooringMaterialLabel,
      roofingLabel,
      designAppealLabel,
      windowFrameLabel
    } = useProperty()

    return {
      wallMaterialLabel,
      ceilingLabel,
      flooringMaterialLabel,
      roofingLabel,
      designAppealLabel,
      windowFrameLabel
    }
  },
  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>
