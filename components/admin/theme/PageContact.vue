<template>
  <div>
    <admin-theme-builder
      title="Page Contact"
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
  setup() {
    return {}
  },

  computed: {
    ...mapFields({
      sections: 'websiteForm.pages.contact.sections',
      showPageHeader: 'websiteForm.pages.contact.showPageHeader',
      showBreadcrumb: 'websiteForm.pages.contact.showBreadcrumb',
      backgroundColor: 'websiteForm.pages.contact.backgroundColor',
      classList: 'websiteForm.pages.contact.classList'
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
