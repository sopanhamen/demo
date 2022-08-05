<template>
  <panel :header="$t('property.title.facility')" :toggleable="true">
    <div class="grid-container">
      <form-field-select-button
        v-model="electricitySupply"
        :options="electricitySupplies"
        :label="$t('electricity_supply.label')"
        :errors="v$.electricitySupply && v$.electricitySupply.$errors"
        option-value="value"
        option-label="label"
        field-class="items-center"
      />
      <form-field-select-button
        v-model="waterSupply"
        :options="waterSupplies"
        :label="$t('water_supply.label')"
        :errors="v$.waterSupply && v$.waterSupply.$errors"
        option-value="value"
        option-label="label"
        field-class="items-center"
      />
    </div>
    <div v-if="facilities && facilities.length > 0" class="mt-5">
      <label class="block font-bold mb-2 text-sm">
        {{ $t('property.title.facility') }}
      </label>
      <div class="grid-container">
        <div
          v-for="facility of facilities"
          :key="facility.id"
          class="field-checkbox"
        >
          <checkbox
            :id="facility.id"
            v-model="selectedFacilities"
            :value="facility.id"
            name="facility"
          />
          <label :for="facility.id">{{ facility.name }}</label>
        </div>
      </div>
    </div>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { createHelpers } from 'vuex-map-fields'
import { ListingPurpose } from '@/enums/ListingPurpose'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      purposes: ListingPurpose
    }
  },

  computed: {
    ...mapFields({
      propertyType: 'form.property_type_id',
      electricitySupply: 'form.facilities.electricity_supply',
      waterSupply: 'form.facilities.water_supply',
      selectedFacilities: 'form.other_facilities'
    }),
    ...mapGetters({
      getElectricitySupplies: 'resource/getElectricitySupplies',
      getWaterSupplies: 'resource/getWaterSupplies',
      getFacilities: 'propertyType/getFacilities'
    }),
    electricitySupplies() {
      return this.getElectricitySupplies.map((electricitySupply) => ({
        value: electricitySupply.value,
        label: this.$t('electricity_supply.model.' + electricitySupply.label)
      }))
    },
    waterSupplies() {
      return this.getElectricitySupplies.map((waterSupply) => ({
        value: waterSupply.value,
        label: this.$t('water_supply.model.' + waterSupply.label)
      }))
    },
    facilities() {
      return this.getFacilities(this.propertyType)
    }
  }
}
</script>

<style lang="postcss" scoped>
.grid-container {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 mt-px;
}
</style>
