<template>
  <panel :header="$t('property.title.facility')" :toggleable="true">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
      <text-block
        :label="$t('electricity_supply.label')"
        :description="
          electricitySupplyLabel(property.facilities.electricity_supply)
        "
      />
      <text-block
        :label="$t('water_supply.label')"
        :description="waterSupplyLabel(property.facilities.water_supply)"
      />
    </div>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gab-y-3">
      <div
        v-for="facility in property.other_facilities"
        :key="facility.id"
        class="flex mt-3 space-x-2"
      >
        <div
          class="bg-yellow-400 rounded-full w-5 h-5 flex justify-center items-center"
        >
          <i class="fa fa-check text-xs text-white" />
        </div>
        <div>
          {{ facility.name }}
        </div>
      </div>
    </div>
  </panel>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { mapState } from 'vuex'
import useProperty from '@/composables/useProperty'

export default {
  name: 'AdminPropertyDetailGeneral',

  setup() {
    const { i18n } = useContext()
    const { electricitySupplyLabel, waterSupplyLabel } = useProperty(i18n)

    return { electricitySupplyLabel, waterSupplyLabel }
  },

  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>
