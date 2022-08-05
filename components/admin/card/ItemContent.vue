<template>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div v-for="row in content" :key="row.id" class="mb-3">
      <div class="text-xs text-gray-500">{{ row.title }}</div>
      <div class="truncate" :title="row.value">
        {{ row.value || 'N/A' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      required: true
    }
  }
}
</script>
