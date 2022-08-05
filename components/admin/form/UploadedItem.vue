<template>
  <div
    class="h-24 grid grid-cols-1 overflow-hidden rounded-md content-center border bg-gray-100"
  >
    <image-preview v-if="isImage" :src="url" class="rounded-md" preview />
    <a
      v-else-if="isPDF"
      :href="url"
      target="_blank"
      class="flex flex-col align-center text-center cursor-pointer"
    >
      <i class="pi pi-file-pdf text-4xl"></i>
      <div class="p-2 text-xs">{{ value.file_name }}</div>
    </a>
    <a
      v-else
      :href="url"
      target="_blank"
      class="flex flex-col align-center text-center cursor-pointer"
    >
      <i class="pi pi-file text-4xl"></i>
      <div class="p-2 text-xs">{{ value.file_name }}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'AdminFormUploadedItem',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    url() {
      if (this.value.file_url) {
        return this.value.file_url
      }

      if (this.value.url) {
        return this.value.url
      }

      return this.value.image_url
    },

    fileType() {
      if (this.value.path) {
        return this.value.path.split('.').pop()
      }

      if (this.value.image_url) {
        return this.value.image_url.split('.').pop()
      }

      if (!this.value.file_url) {
        return null
      }

      return this.value.file_url.split('.').pop()
    },
    isImage() {
      return ['png', 'jpg', 'gif', 'jpeg'].includes(this.fileType)
    },
    isPDF() {
      return this.fileType === 'pdf'
    },
    isZip() {
      return this.fileType === 'zip'
    }
  }
}
</script>
