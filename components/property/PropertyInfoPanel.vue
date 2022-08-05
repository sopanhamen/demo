<template>
  <div>
    <panel :header="header" :toggleable="toggleable">
      <slot name="content"> </slot>
    </panel>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      default: null
    },
    toggleable: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default() {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-panel-header {
  background-color: white;
}
</style>
