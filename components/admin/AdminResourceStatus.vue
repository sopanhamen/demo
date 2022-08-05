<template>
  <div
    :hide="status === 'success'"
    :class="{
      'text-red-500': status === 'failed',
      'text-blue-500': status === 'fetching'
    }"
  >
    <div v-if="status === 'fetching'">
      <i class="pi pi-spinner pi-spin"></i>
      <span>Updating...</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useResource from '@/composables/useResource'

export default defineComponent({
  setup() {
    const { status } = useResource()
    return { status }
  }
})
</script>
