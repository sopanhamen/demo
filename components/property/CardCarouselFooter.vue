<template>
  <div>
    <div class="border-t-2 border-primary" />
    <div class="flex justify-between p-4">
      <div class="flex">
        <i class="fa fa-map-marker mr-2 text-primary-thick" />
        <a
          v-if="property.location.lat_lng"
          :href="`http://www.google.com/maps/place/${property.location.lat_lng}`"
          target="_blank"
        >
          <span class="font-normal text-sm text-gray-600">
            {{ fullAddress(property.location) }}
          </span>
        </a>
        <span v-else class="font-normal text-sm text-gray-600">
          {{ fullAddress(property.location) }}
        </span>
      </div>
      <div class="text-sm text-gray-600">
        <nuxt-link
          :to="localePath('/detail-listing/' + property.id)"
          class="bg-primary-lighter text-primary-thick rounded-full font-bold px-4 py-2 whitespace-nowrap"
        >
          {{ $t('common.view') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import useLocation from '@/composables/useLocation'

export default {
  props: {
    property: {
      type: Object,
      required: true
    }
  },
  setup() {
    const { fullAddress } = useLocation()
    return { fullAddress }
  }
}
</script>
