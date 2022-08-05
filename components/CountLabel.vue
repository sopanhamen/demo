<template>
  <div>
    <hr />
    <div
      class="text-center cursor-pointer text-blue-700 bg-white shadow rounded-md py-6"
    >
      <h1 class="text-2xl">{{ number || '0' }}</h1>
      {{ name }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default() {
        return ''
      }
    },
    number: {
      type: Number,
      default() {
        return 0
      }
    }
  }
}
</script>
