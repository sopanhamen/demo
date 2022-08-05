<template>
  <div class="mb-3">
    <div class="text-xs text-gray-500">{{ item.title }}</div>
    <div class="truncate" :title="item.value">
      {{ item.value || 'N/A' }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
