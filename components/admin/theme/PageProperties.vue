<template>
  <div>
    <admin-theme-builder
      title="Page Properties"
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
      sections: 'websiteForm.pages.properties.sections',
      showPageHeader: 'websiteForm.pages.properties.showPageHeader',
      showBreadcrumb: 'websiteForm.pages.properties.showBreadcrumb',
      backgroundColor: 'websiteForm.pages.properties.backgroundColor',
      classList: 'websiteForm.pages.properties.classList'
    }),
    data() {
      return {
        sections: this.sections,
        showPageHeader: this.showPageHeader,
        showBreadcrumb: this.showBreadcrumb,
        backgroundColor: this.backgroundColor,
        classList: this.classList
      }
    }
  },
  methods: {
    updatePage(data) {
      this.sections = data.sections
      this.showPageHeader = data.showPageHeader
      this.showBreadcrumb = data.showBreadcrumb
      this.backgroundColor = data.backgroundColor
      this.classList = data.classList
    }
  }
})
</script>
