<template>
  <div class="border rounded-md bg-white font-semibold text-sm text-gray-600">
    <div class="py-2 px-5 border-b">
      <p class="text-red-500 text-lg">{{ title }}</p>
    </div>
    <div class="grid grid-cols-1 gap-x-5 gap-y-4 px-5 pt-2 pb-7">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCardForm',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
