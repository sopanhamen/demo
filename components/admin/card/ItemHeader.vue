<template>
  <div :class="{ 'pt-5 px-5 pb-0': !theme }">
    <nuxt-img
      v-for="(row, key) in images"
      :key="key"
      class="object-cover border-2 ring-gray-500"
      :class="{
        'w-56 h-40 rounded-md': theme == 'rectangle',
        'w-32 h-32 rounded-full': !theme
      }"
      :src="row"
      alt="thumbnail"
    />
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: ''
    }
  }
}
</script>
