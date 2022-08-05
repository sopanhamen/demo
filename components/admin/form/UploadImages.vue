<template>
  <div>
    <admin-form-uploaded-item-list
      v-if="images.length > 0"
      :files="images"
      @delete-file="$emit('delete-file', $event)"
    />
    <pv-message
      v-if="hasPhotos"
      :closable="false"
      severity="info"
      class="bg-indigo-100 mt-2 mb-2"
    >
      {{ $t('upload.message.instruct_upload_photos') }}
    </pv-message>
    <file-upload
      v-if="renderComponent"
      name="images[]"
      class="text-sm"
      button-class="p-button-sm"
      :multiple="multiple"
      :accept="accept"
      :custom-upload="true"
      :max-file-size="maxFileSize"
      :preview-width="80"
      :show-cancel-button="false"
      @uploader="uploader"
      @select="photosSelected"
    >
      <template #empty>
        <p>{{ $t('upload.message.instruct_drag_and_drop_photos') }}</p>
      </template>
    </file-upload>
  </div>
</template>

<script>
export default {
  name: 'AdminFormUploadImages',
  props: {
    images: {
      type: Array,
      default() {
        return []
      }
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

  data() {
    return {
      renderComponent: true,
      hasPhotos: false
    }
  },

  methods: {
    photosSelected() {
      this.hasPhotos = true
    },

    async uploader(event) {
      try {
        const formData = new FormData()
        for (let i = 0; i < event.files.length; i++) {
          const file = event.files[i]
          formData.append('images[' + i + ']', file)
        }
        const { data } = await this.$axios.$post('uploads/images', formData)

        // HACK PRIMEVUE: make component to render to clear images
        this.renderComponent = false
        if (data) {
          setTimeout(() => {
            this.renderComponent = true
          }, 200)
        }

        this.$emit('uploaded', data)
        this.hasPhotos = false
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

::v-deep .p-fileupload-buttonbar {
  button.p-button {
    font-size: 0.875rem !important;
    background-color: rgba(22, 163, 74, var(--tw-bg-opacity)) !important;
    border-color: rgba(22, 163, 74, var(--tw-bg-opacity)) !important;
  }
}
</style>
