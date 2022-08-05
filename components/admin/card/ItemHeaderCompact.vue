<template>
  <div class="flex items-center space-x-2 py-4">
    <input type="checkbox" name="" class="rounded cursor-pointer" />
    <nuxt-link
      v-if="link"
      :to="link"
      class="font-bold text-indigo-600 hover:text-indigo-500"
    >
      {{ title }}
    </nuxt-link>
    <span v-else>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: null
    }
  }
}
</script>
