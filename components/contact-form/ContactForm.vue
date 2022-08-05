<template>
  <component
    :is="`ContactForm${props.style.name}`"
    v-if="props.style"
    :props="props"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    props: {
      type: Object,
      required: true
    }
  }
})
</script>
