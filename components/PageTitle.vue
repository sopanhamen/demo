<template>
  <div class="container mx-auto text-2xl font-bold">
    <slot>
      {{ title }}
    </slot>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>
