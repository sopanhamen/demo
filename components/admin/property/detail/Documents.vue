<template>
  <panel :header="$t('property.title.documents')" :toggleable="true">
    <div class="grid grid-flow-col auto-cols-max">
      <file-item
        v-for="document in property.documents"
        :key="document.id"
        :url="document.file_url"
        :type="document.file_type"
        :name="document.file_name"
      />
    </div>
  </panel>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PropertyDocuments',

  data() {
    return {
      noImg: 'https://www.mop.gov.kh/Images/noImg.jpg'
    }
  },

  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>
