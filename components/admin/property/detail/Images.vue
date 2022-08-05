<template>
  <panel :header="$t('common.images')" :toggleable="true">
    <div class="grid grid-cols-2 gap-5">
      <image-preview
        v-for="image in property.images"
        :key="image.id"
        :src="image.thumbnail_url || noImg"
        :preview="true"
        alt="Property Image"
      />
    </div>
  </panel>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PropertyImages',

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
