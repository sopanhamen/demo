<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="ql-editor" v-html="props.description"></div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TextContent',

  props: {
    props: {
      type: Object,
      default() {
        return {
          description: ''
        }
      }
    }
  }
})
</script>
