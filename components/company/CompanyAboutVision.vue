<template>
  <component :is="props.style.name" :props="props" />
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyAboutVision',
  props: {
    props: {
      type: Object,
      required: true
    }
  }
})
</script>
