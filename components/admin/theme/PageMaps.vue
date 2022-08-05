<template>
  <div>
    <admin-theme-builder title="Page Maps" :data="data" @change="updatePage" />
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
      sections: 'websiteForm.pages.maps.sections',
      showPageHeader: 'websiteForm.pages.maps.showPageHeader',
      showBreadcrumb: 'websiteForm.pages.maps.showBreadcrumb'
    }),
    data() {
      return {
        sections: this.sections,
        showPageHeader: this.showPageHeader,
        showBreadcrumb: this.showBreadcrumb
      }
    }
  },
  methods: {
    updatePage(data) {
      this.sections = data.sections
      this.showPageHeader = data.showPageHeader
      this.showBreadcrumb = data.showBreadcrumb
    }
  }
})
</script>
