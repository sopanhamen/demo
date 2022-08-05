<template>
  <div>
    <admin-theme-builder title="Page About" :data="data" @change="updatePage" />
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
      sections: 'websiteForm.pages.about.sections',
      showPageHeader: 'websiteForm.pages.about.showPageHeader',
      showBreadcrumb: 'websiteForm.pages.about.showBreadcrumb',
      backgroundColor: 'websiteForm.pages.about.backgroundColor',
      classList: 'websiteForm.pages.about.classList'
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
