<template>
  <div class="file-container">
    <a
      target="_blank"
      class="flex flex-col align-center text-center cursor-pointer"
      :class="{ 'opacity-50 cursor-not-allowed': !url }"
      @click.prevent="onClickedDOcument()"
    >
      <i v-if="isImage" class="pi pi-image text-6xl text-indigo-600"></i>
      <i v-else-if="isPDF" class="pi pi-file-pdf text-6xl text-red-600"></i>
      <i v-else class="pi pi-file text-6xl"></i>
      <div class="p-2 text-xs break-words">{{ name || 'N/A' }}</div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: null
    }
  },

  computed: {
    fileType() {
      if (this.type) {
        return this.type
      }

      if (!this.url) {
        return false
      }

      return this.url.split('.').pop()
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
  },

  methods: {
    onClickedDOcument() {
      if (!this.url) {
        return
      }

      this.$axios.get(this.url, { responseType: 'blob' }).then((response) => {
        const blobUrl = window.URL.createObjectURL(new Blob([response.data]))

        let type = 'unknown'
        if (this.isPDF) {
          type = 'pdf'
        } else if (this.isImage) {
          type = 'image'
        }

        this.$document.open({ type, name: this.name, data: blobUrl })
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.file-container {
  @apply w-36 opacity-90 hover:opacity-100 hover:font-bold;
}
</style>
