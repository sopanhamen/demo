<template>
  <div>
    <label v-if="label" class="block -mb-3 font-bold text-sm">
      {{ label }}
    </label>
    <div class="input-block-container" :class="'md:grid-cols-' + grid">
      <slot></slot>
      <div v-if="close" class="absolute t-o right-0">
        <pv-button
          icon="pi pi-times"
          class="p-button-sm p-button-text p-button-danger py-2"
          @click="$emit('close', true)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },
    grid: {
      type: Number,
      default: 2
    },
    close: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.input-block-container {
  @apply grid grid-cols-1 gap-5;
  @apply bg-white rounded-md px-4 py-4 border relative mt-4;
}
</style>
