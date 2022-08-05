<template>
  <div :class="containerClass">
    <slot name="label" :label="label" :description="description">
      <p class="text-sm text-gray-500">{{ label }}</p>
    </slot>
    <slot
      name="description"
      :label="label"
      :description="description"
      :placeholder="placeholder"
    >
      <span v-if="description">{{ description }}</span>
      <span v-else class="text-gray-400">{{ placeholder }}</span>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    description: {
      type: [String, Number, Boolean],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'N/A'
    },
    containerClass: {
      type: [Array, Object, String],
      default() {
        return ''
      }
    }
  }
}
</script>
