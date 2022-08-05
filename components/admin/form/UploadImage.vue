<template>
  <div>
    <file-upload
      name="image"
      class="text-sm"
      button-class="p-button-sm"
      :accept="accept"
      :auto="true"
      :custom-upload="true"
      :max-file-size="maxFileSize"
      :preview-width="80"
      :show-upload-button="false"
      :show-cancel-button="false"
      @uploader="uploader"
    >
      <template #empty>
        <div v-if="image" class="relative">
          <img :src="image" class="rounded-md h-60 shadow-md" />
          <div class="text-right absolute top-1 right-1">
            <i
              class="pi pi-trash bg-red-600 px-2 py-2 rounded-md text-white cursor-pointer"
              @click="$emit('delete-image', image)"
            />
          </div>
        </div>
        <p v-else>Drag and drop files to here to upload.</p>
      </template>
    </file-upload>
  </div>
</template>

<script>
export default {
  name: 'AdminFormUploadImage',
  props: {
    image: {
      type: String,
      default: null
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    maxFileSize: {
      type: Number,
      default: 500000000 // 500 MB
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    async uploader(event) {
      try {
        const formData = new FormData()
        formData.append('image', event.files[0])

        const { data } = await this.$axios.$post('uploads/image', formData)

        this.$emit('uploaded', data)
      } catch (error) {
        this.$toast.add({
          severity: 'warn',
          summary: this.$t('error.label'),
          detail: this.$t('message.error_upload'),
          life: 3000
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-card {
  .p-card-content {
    display: none;
  }

  .p-card-body {
    padding: 0;
  }
}
</style>
