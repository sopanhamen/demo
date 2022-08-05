<template>
  <admin-card-form :title="title">
    <upload-component :img-center="true" />
  </admin-card-form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return this.$t('common.photo')
      }
    }
  }
}
</script>
