<template>
  <panel :header="$t('property.title.land_description')" :toggleable="true">
    <div class="grid-container">
      <form-field-input-group
        v-model="landWidth"
        :label="$t('property.model.land.width')"
        :errors="v$.landWidth && v$.landWidth.$errors"
        :placeholder="$t('common.number_only')"
        :add-on-text="$t('length_unit.abbreviation.meter')"
        type="decimal"
        position="right"
        color="bg-gray-200"
        @input="calcLandSize"
      />
      <form-field-input-group
        v-model="landLength"
        :label="$t('property.model.land.length')"
        :errors="v$.landLength && v$.landLength.$errors"
        :placeholder="$t('common.number_only')"
        :add-on-text="$t('length_unit.abbreviation.meter')"
        type="decimal"
        position="right"
        color="bg-gray-200"
        @input="calcLandSize"
      />
    </div>
    <div class="grid-container lg:grid-cols-1 mt-4">
      <form-field-input-group
        v-model="landSize"
        :label="$t('property.model.land.size')"
        :errors="v$.landSize && v$.landSize.$errors"
        :placeholder="$t('common.number_only')"
        :add-on-text="$t('length_unit.abbreviation.square_meter')"
        type="decimal"
        position="right"
        color="bg-gray-200"
      >
        <template #right>
          <select
            v-model="landSizeUnit"
            class="bg-transparent outline-none text-base"
            @change="calcLandSize"
          >
            <option
              v-for="unit in lengthUnits"
              :key="unit.value"
              :value="unit.value"
            >
              {{ unit.label }}
            </option>
          </select>
        </template>
      </form-field-input-group>
    </div>
    <div
      v-if="selectedFormLayout === formLayouts.DETAIL && isLandSelected()"
      class="grid-container mt-4"
    >
      <form-field-select
        v-model="landShape"
        :options="landShapes"
        :label="$t('land_shape.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.landShape && v$.landShape.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-model="zoning"
        :options="zonings"
        :label="$t('zoning.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.zoning && v$.zoning.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-model="topography"
        :options="topographies"
        :label="$t('topography.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.topography && v$.topography.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-model="sewerage"
        :options="sewerages"
        :label="$t('sewerage.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.sewerage && v$.sewerage.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-model="drainage"
        :options="drainages"
        :label="$t('drainage.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.drainage && v$.drainage.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-select
        v-model="locationAppeal"
        :options="locationAppeals"
        :label="$t('location_appeal.label')"
        :placeholder="$t('common.select') + '...'"
        :errors="v$.locationAppeal && v$.locationAppeal.$errors"
        option-label="label"
        option-value="value"
      />
      <form-field-textarea
        v-model="currentUsed"
        :label="$t('property.model.land.current_used')"
        :row="2"
        :errors="v$.currentUsed && v$.currentUsed.$errors"
        placeholder="..."
      />
      <form-field-textarea
        v-model="surroundingLandUsed"
        :label="$t('property.model.land.surrounding_land_used')"
        :row="2"
        :errors="v$.surroundingLandUsed && v$.surroundingLandUsed.$errors"
        placeholder="..."
      />
    </div>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { createHelpers } from 'vuex-map-fields'
import { LengthUnit } from '~/enums/LengthUnit'
import { FormLayout } from '~/enums/FormLayout'
import { PropertyTypeGroup } from '~/enums/PropertyTypeGroup'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      formLayouts: FormLayout
    }
  },

  computed: {
    ...mapFields({
      selectedFormLayout: 'form.other.form_layout',
      propertyType: 'form.property_type_id',
      landWidth: 'form.detail.land_width',
      landLength: 'form.detail.land_length',
      landSize: 'form.detail.land_size',
      landSizeUnit: 'form.detail.land_size_unit',
      landShape: 'form.detail.land_shape',
      zoning: 'form.detail.zoning',
      topography: 'form.detail.topography',
      sewerage: 'form.detail.sewerage',
      drainage: 'form.detail.drainage',
      locationAppeal: 'form.detail.location_appeal',
      currentUsed: 'form.detail.current_used',
      surroundingLandUsed: 'form.detail.surrounding_land_used'
    }),
    ...mapGetters({
      getPropertyTypeById: 'propertyType/getPropertyTypeById',
      getLengthUnits: 'resource/getLengthUnits',
      getLandShapes: 'resource/getLandShapes',
      getZonings: 'resource/getZonings',
      getTopographies: 'resource/getTopographies',
      getSewerages: 'resource/getSewerages',
      getDrainages: 'resource/getDrainages',
      getLocationAppeals: 'resource/getLocationAppeals'
    }),
    lengthUnits() {
      return this.getLengthUnits.map((lengthUnit) => ({
        value: lengthUnit.value,
        label: this.$t('length_unit.abbreviation.' + lengthUnit.label)
      }))
    },
    landShapes() {
      return this.getLandShapes.map((landShape) => ({
        value: landShape.value,
        label: this.$t('land_shape.model.' + landShape.label)
      }))
    },
    zonings() {
      return this.getZonings.map((zoning) => ({
        value: zoning.value,
        label: this.$t('zoning.model.' + zoning.label)
      }))
    },
    topographies() {
      return this.getTopographies.map((topography) => ({
        value: topography.value,
        label: this.$t('topography.model.' + topography.label)
      }))
    },
    sewerages() {
      return this.getSewerages.map((sewerage) => ({
        value: sewerage.value,
        label: this.$t('sewerage.model.' + sewerage.label)
      }))
    },
    drainages() {
      return this.getDrainages.map((drainage) => ({
        value: drainage.value,
        label: this.$t('drainage.model.' + drainage.label)
      }))
    },
    locationAppeals() {
      return this.getLocationAppeals.map((locationAppeal) => ({
        value: locationAppeal.value,
        label: this.$t('location_appeal.model.' + locationAppeal.label)
      }))
    }
  },

  methods: {
    isLandSelected() {
      const propertyType = this.getPropertyTypeById(this.propertyType)
      if (!propertyType) {
        return false
      }

      return propertyType.property_type_group === PropertyTypeGroup.LANDS_PLOTS
    },
    calcLandSize() {
      const landSize = this.landWidth * this.landLength
      if (LengthUnit.HECTARE === this.landSizeUnit) {
        this.landSize = landSize / 10000
      } else {
        this.landSize = landSize
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.grid-container {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 mt-px;
}
</style>
