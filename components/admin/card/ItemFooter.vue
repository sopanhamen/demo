<template>
  <div class="-my-3">
    <div class="border-b-2 border-yellow-400 mb-1" />
    <div class="flex justify-between space-x-2">
      <!-- <div class="p-field-checkbox py-2">
        <checkbox v-model="selected" :value="item" name="selected" />
      </div> -->
      <div class="py-2">&nbsp;</div>
      <div class="space-x-0">
        <slot name="actions" :row="item"></slot>
      </div>
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
  },
  data() {
    return {
      selected: []
    }
  }
}
</script>
