<template>
  <div>
    <div class="border rounded-md bg-white font-semibold text-sm text-gray-600">
      <div class="p-4 border-b">
        <p class="text-red-500 text-lg">{{ $t('common.photos') }}</p>
      </div>
      <div class="p-4">
        <p class="pb-2">{{ $t('common.photos') }}</p>
        <upload-component :img-center="true" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadPhoto',
  props: {
    label: {
      type: String,
      default() {
        return this.$t('common.photos')
      }
    }
  }
}
</script>
