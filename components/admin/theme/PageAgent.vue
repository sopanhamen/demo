<template>
  <admin-theme-builder title="Page Agent" :data="data" @change="updatePage" />
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
      sections: 'websiteForm.pages.agent.sections',
      showPageHeader: 'websiteForm.pages.agent.showPageHeader',
      showBreadcrumb: 'websiteForm.pages.agent.showBreadcrumb',
      backgroundColor: 'websiteForm.pages.agent.backgroundColor',
      classList: 'websiteForm.pages.agent.classList'
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
