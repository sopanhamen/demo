<template>
  <panel :header="$t('property.title.building_description')" :toggleable="true">
    <div class="grid-container">
      <form-field-input-group
        v-model="buildingWidth"
        :label="$t('property.model.building.width')"
        :errors="v$.buildingWidth && v$.buildingWidth.$errors"
        :placeholder="$t('common.number_only')"
        :add-on-text="$t('length_unit.abbreviation.meter')"
        type="decimal"
        position="right"
        color="bg-gray-200"
      />
      <form-field-input-group
        v-model="buildingLength"
        :label="$t('property.model.building.length')"
        :errors="v$.buildingLength && v$.buildingLength.$errors"
        :placeholder="$t('common.number_only')"
        :add-on-text="$t('length_unit.abbreviation.meter')"
        type="decimal"
        position="right"
        color="bg-gray-200"
      />
      <form-field-input
        v-model="numberOfStories"
        :label="$t('property.model.building.number_of_stories')"
        :errors="v$.numberOfStories && v$.numberOfStories.$errors"
        :placeholder="$t('common.number_only')"
        type="decimal"
      />
      <form-field-input-group
        v-model="grossBuildingAreaSize"
        :label="$t('property.model.building.gross_building_area')"
        :errors="v$.grossBuildingAreaSize && v$.grossBuildingAreaSize.$errors"
        :placeholder="$t('common.number_only')"
        :add-on-text="$t('length_unit.abbreviation.square_meter')"
        type="decimal"
        position="right"
        color="bg-gray-200"
      />
      <form-field-select
        v-if="formLayout === FormLayout.DETAIL"
        v-model="mainWall"
        :options="mainWalls"
        :label="$t('property.model.building.main_wall')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.mainWall && v$.mainWall.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-if="formLayout === FormLayout.DETAIL"
        v-model="ceiling"
        :options="ceilings"
        :label="$t('ceiling.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.ceiling && v$.ceiling.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-if="formLayout === FormLayout.DETAIL"
        v-model="flooringMaterial"
        :options="flooringMaterials"
        :label="$t('flooring_material.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.flooringMaterial && v$.flooringMaterial.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-if="formLayout === FormLayout.DETAIL"
        v-model="roofing"
        :options="roofings"
        :label="$t('roofing.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.roofing && v$.roofing.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-if="formLayout === FormLayout.DETAIL"
        v-model="windowFrame"
        :options="windowFrames"
        :label="$t('window_frame.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.windowFrame && v$.windowFrame.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-if="formLayout === FormLayout.DETAIL"
        v-model="designAppeal"
        :options="designAppeals"
        :label="$t('design_appeal.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.designAppeal && v$.designAppeal.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-input
        v-if="formLayout === FormLayout.DETAIL"
        v-model="yearOfConstruction"
        :label="$t('property.model.building.year_of_construction')"
        :errors="v$.yearOfConstruction && v$.yearOfConstruction.$errors"
        type="number"
      />
      <form-field-input-group
        v-if="formLayout === FormLayout.DETAIL"
        v-model="estimatedYearsOfUsable"
        :label="$t('property.model.building.estimated_years_usable')"
        :errors="v$.estimatedYearsOfUsable && v$.estimatedYearsOfUsable.$errors"
        :add-on-text="$t('common.year')"
        type="number"
        position="right"
      />
      <form-field-input-group
        v-if="formLayout === FormLayout.DETAIL"
        v-model="actualAge"
        up
        :label="$t('property.model.building.actual_age')"
        :errors="v$.actualAge && v$.actualAge.$errors"
        :add-on-text="$t('common.year')"
        type="number"
        position="right"
      />
      <form-field-input-group
        v-if="formLayout === FormLayout.DETAIL"
        v-model="effectiveAge"
        :label="$t('property.model.building.effective_age')"
        :errors="v$.effectiveAge && v$.effectiveAge.$errors"
        :add-on-text="$t('common.year')"
        type="number"
        position="right"
      />
      <form-field-input-group
        v-if="formLayout === FormLayout.DETAIL"
        v-model="estimatedCost"
        :label="$t('property.model.building.estimated_cost')"
        :errors="v$.estimatedCost && v$.estimatedCost.$errors"
        :add-on-text="$t('length_unit.abbreviation.square_meter')"
        position="right"
        type="number"
      />
      <form-field-input
        v-if="formLayout === FormLayout.DETAIL"
        v-model="numberOfMezzanines"
        :label="$t('property.model.building.number_of_mezzanines')"
        :errors="v$.numberOfMezzanines && v$.numberOfMezzanines.$errors"
        type="number"
      />
      <form-field-input
        v-model="numberOfBedrooms"
        :label="$t('property.model.building.number_of_bedrooms')"
        :errors="v$.numberOfBedrooms && v$.numberOfBedrooms.$errors"
        type="number"
      />
      <form-field-input
        v-model="numberOfBathrooms"
        :label="$t('property.model.building.number_of_bathrooms')"
        :errors="v$.numberOfBathrooms && v$.numberOfBathrooms.$errors"
        type="number"
      />
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
import { FormLayout } from '@/enums/FormLayout'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return { FormLayout }
  },

  computed: {
    ...mapFields({
      formLayout: 'form.other.form_layout',
      buildingWidth: 'form.detail.building_width',
      buildingLength: 'form.detail.building_length',
      numberOfStories: 'form.detail.number_of_stories',
      grossBuildingAreaSize: 'form.detail.gross_building_area_size',
      mainWall: 'form.detail.building_main_wall',
      ceiling: 'form.detail.ceiling',
      flooringMaterial: 'form.detail.flooring_material',
      roofing: 'form.detail.roofing',
      windowFrame: 'form.detail.window_frame',
      designAppeal: 'form.detail.design_appeal',
      yearOfConstruction: 'form.detail.year_of_construction',
      estimatedYearsOfUsable: 'form.detail.estimated_years_usable',
      actualAge: 'form.detail.actual_age',
      effectiveAge: 'form.detail.effective_age',
      estimatedCost: 'form.detail.estimated_cost',
      numberOfMezzanines: 'form.detail.number_of_mezzanines',
      numberOfBedrooms: 'form.detail.number_of_bedrooms',
      numberOfBathrooms: 'form.detail.number_of_bathrooms'
    }),
    ...mapGetters({
      getWallMaterials: 'resource/getWallMaterials',
      getCeilings: 'resource/getCeilings',
      getFlooringMaterials: 'resource/getFlooringMaterials',
      getRoofings: 'resource/getRoofings',
      getWindowFrames: 'resource/getWindowFrames',
      getDesignAppeals: 'resource/getDesignAppeals'
    }),
    mainWalls() {
      return this.getWallMaterials.map((mainWall) => ({
        value: mainWall.value,
        label: this.$t('wall_material.model.' + mainWall.label)
      }))
    },
    ceilings() {
      return this.getCeilings.map((ceiling) => ({
        value: ceiling.value,
        label: this.$t('ceiling.model.' + ceiling.label)
      }))
    },
    flooringMaterials() {
      return this.getFlooringMaterials.map((flooringMaterial) => ({
        value: flooringMaterial.value,
        label: this.$t('flooring_material.model.' + flooringMaterial.label)
      }))
    },
    roofings() {
      return this.getRoofings.map((roofing) => ({
        value: roofing.value,
        label: this.$t('roofing.model.' + roofing.label)
      }))
    },
    windowFrames() {
      return this.getWindowFrames.map((windowFrame) => ({
        value: windowFrame.value,
        label: this.$t('window_frame.model.' + windowFrame.label)
      }))
    },
    designAppeals() {
      return this.getDesignAppeals.map((designAppeal) => ({
        value: designAppeal.value,
        label: this.$t('design_appeal.model.' + designAppeal.label)
      }))
    }
  }
}
</script>

<style lang="postcss" scoped>
.grid-container {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 mt-px;
}
</style>
