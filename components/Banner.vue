<template>
  <div :style="styleList(props)" :class="props.classList">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="ql-editor -mb-6" v-html="props.title"></div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="ql-editor -mt-6" v-html="props.subTitle"></div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useTheme from '@/composables/useTheme'

export default defineComponent({
  name: 'PageBanner',

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
