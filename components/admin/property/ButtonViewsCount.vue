<template>
  <div
    class="text-center pr-2 py-4 cursor-pointer"
    @click="$emit('click', $event)"
  >
    <p class="views-count">
      {{ viewsCount }}
    </p>
    <i class="fa fa-eye fa-lg pl-1" />
  </div>
</template>

<script>
export default {
  props: {
    viewsCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="postcss" scoped>
.views-count {
  @apply bg-yellow-400 text-xs px-1 py-px rounded text-center absolute top-2;
}
</style>
