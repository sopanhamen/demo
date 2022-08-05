<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-1">
    <div class="text-sm font-medium text-gray-700" :class="labelClass">
      {{ label }}
    </div>
    <div
      class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
      :class="valueClass"
    >
      : {{ value || 'N/A' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: 'N/A'
    },
    labelClass: {
      type: [String, Object],
      default() {
        return ''
      }
    },
    valueClass: {
      type: [String, Object],
      default() {
        return ''
      }
    }
  }
}
</script>
