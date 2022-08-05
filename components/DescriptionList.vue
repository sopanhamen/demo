<template>
  <div>
    <description-list-item
      v-for="item in items"
      :key="item.id"
      :label="item.title"
      :value="item.value"
    />
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
