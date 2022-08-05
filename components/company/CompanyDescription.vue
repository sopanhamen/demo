<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10">
    <div>
      <nuxt-img
        v-if="props.imageUrl"
        :src="props.imageUrl"
        class="w-full rounded-md"
        alt="Building Image"
      />
    </div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="ql-editor" v-html="props.description"></div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyDescription',

  props: {
    props: {
      type: Object,
      default() {
        return {
          description: '',
          imageUrl: null
        }
      }
    }
  },

  setup() {
    return {}
  }
})
</script>
