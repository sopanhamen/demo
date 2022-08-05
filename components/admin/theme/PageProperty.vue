<template>
  <div>
    <admin-theme-builder
      title="Page Property"
      :data="data"
      @change="updatePage"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'theme/getField',
  mutationType: 'theme/updateField'
})

export default defineComponent({
  computed: {
    ...mapFields({
      sections: 'websiteForm.pages.property.sections',
      showPageHeader: 'websiteForm.pages.property.showPageHeader',
      showBreadcrumb: 'websiteForm.pages.property.showBreadcrumb',
      classList: 'websiteForm.pages.property.classList',
      backgroundColor: 'websiteForm.pages.property.backgroundColor'
    }),
    data() {
      return {
        sections: this.sections,
        showPageHeader: this.showPageHeader,
        showBreadcrumb: this.showBreadcrumb,
        classList: this.classList,
        backgroundColor: this.backgroundColor
      }
    }
  },
  methods: {
    updatePage(data) {
      this.sections = data.sections
      this.showPageHeader = data.showPageHeader
      this.showBreadcrumb = data.showBreadcrumb
      this.classList = data.classList
      this.backgroundColor = data.backgroundColor
    }
  }
})
</script>
