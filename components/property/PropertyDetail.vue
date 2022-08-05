<template>
  <component
    :is="`PropertyDetail${props.style.name}`"
    :style="styleList(props)"
    :class="props.classList"
  />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useTheme from '@/composables/useTheme'

export default defineComponent({
  props: {
    props: {
      type: Object,
      required: true
    }
  },

  setup() {
    const { styleList } = useTheme()
    return { styleList }
  }
})
</script>
