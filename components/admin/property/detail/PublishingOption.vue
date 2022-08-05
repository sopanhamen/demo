<template>
  <panel :header="$t('property.title.publishing')" :toggleable="true">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-4">
      <text-block
        :label="$t('common.published')"
        :description="
          property.publishing.published ? $t('common.yes') : $t('common.no')
        "
      />
      <text-block
        :label="$t('property.model.publishing.published_on_website')"
        :description="
          property.publishing.published_on_website
            ? $t('common.yes')
            : $t('common.no')
        "
      />
      <text-block
        :label="$t('common.exclusive')"
        :description="
          property.publishing.exclusive ? $t('common.yes') : $t('common.no')
        "
      />
    </div>
    <div>
      <text-block
        :label="$t('common.note')"
        :description="property.publishing.description"
      />
    </div>
  </panel>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>
