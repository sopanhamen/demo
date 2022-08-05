<template>
  <pv-dialog
    :show-header="true"
    :header="$t('common.documents')"
    :visible.sync="isDisplayed"
    :position="position"
    :container-style="{ width: '60vw' }"
    :close-on-escape="true"
    :closable="true"
    :modal="true"
  >
    <div class="grid grid-flow-col auto-cols-max">
      <file-item
        v-for="document in documents"
        :key="document.id"
        :url="document.file_url"
        :type="document.file_type"
        :name="document.file_name"
      />
    </div>

    <template #footer>
      <div class="flex justify-end mt-4">
        <pv-button
          :label="$t('common.close')"
          class="p-button-text p-button-plain p-button-sm bg-gray-200"
          icon="pi pi-times"
          @click="closeDialog"
        />
      </div>
    </template>
  </pv-dialog>
</template>

<script>
export default {
  name: 'AdminPropertyDialogDocument',
  props: {
    display: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top'
    },
    property: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      documents: []
    }
  },

  computed: {
    isDisplayed: {
      get() {
        return this.display
      },
      set(value) {
        this.$emit('update:display', value)
      }
    }
  },

  watch: {
    property(value) {
      this.fetchDocuments(value)
    }
  },

  methods: {
    closeDialog() {
      this.$emit('update:display', false)
    },
    async fetchDocuments(property) {
      const { data } = await this.$service.property.getDocuments(property)
      this.documents = data
    }
  }
}
</script>
