<template>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div v-for="row in items" :key="row.id" class="mb-3">
      <div class="text-xs text-gray-500">{{ row.title }}</div>
      <div class="truncate py-2" :title="row.value">
        {{ row.value || 'N/A' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
