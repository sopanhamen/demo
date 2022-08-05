<template>
  <div class="mt-4">
    <div
      class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 p-4 -mt-8"
    >
      <div>
        <span class="text-gray-500">{{ $t('electricity_supply.label') }}:</span>
        {{ electricitySupplyLabel(item.facilities.electricity_supply) }}
      </div>
      <div>
        <span class="text-gray-500">{{ $t('water_supply.label') }}:</span>
        {{ waterSupplyLabel(item.facilities.water_supply) }}
      </div>
    </div>
    <div
      class="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 p-4 -mt-8"
    >
      <div
        v-for="facility in item.other_facilities"
        :key="facility.id"
        class="flex mt-3 space-x-2"
      >
        <div
          class="bg-primary rounded-full w-5 h-5 flex justify-center items-center"
        >
          <i class="fa fa-check text-xs text-white" />
        </div>
        <div>
          {{ facility.name }}
        </div>
      </div>
    </div>
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
    const { waterSupplyLabel, electricitySupplyLabel } = useProperty(i18n)

    return { waterSupplyLabel, electricitySupplyLabel }
  }
}
</script>
