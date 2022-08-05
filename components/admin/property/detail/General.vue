<template>
  <panel :header="$t('common.general_information')" :toggleable="true">
    <div v-if="property" class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
      <text-block
        :label="$t('property_type.label')"
        :description="property.property_type.name"
      />
      <text-block
        :label="$t('listing_purpose.label')"
        :description="listingPurposeLabel(property.listing_purpose)"
      />
      <text-block
        :label="$t('property.model.code')"
        :description="property.code"
      />
      <text-block
        :label="$t('property.model.valuation_report_number')"
        :description="property.valuation_report_number"
      />
      <text-block
        :label="$t('developer.label')"
        :description="property.developer && property.developer.name"
      />
      <text-block
        :label="$t('project.label')"
        :description="property.project && property.project.name"
      />
      <text-block
        :label="$t('deed_type.label')"
        :description="deedTypeLabel(property.title_deed_type)"
      />
      <text-block
        :label="$t('property.model.title_deed_number')"
        :description="property.title_deed_number"
      />
      <text-block
        :label="$t('data_source.label')"
        :description="dataSourceLabel(property.data_source)"
      />
      <text-block
        :label="$t('property.model.listing_date')"
        :description="property.listing_date | formatDate"
      />
    </div>
  </panel>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
import { mapState } from 'vuex'
import useProperty from '@/composables/useProperty'

export default {
  name: 'AdminPropertyDetailGeneral',

  setup() {
    const { i18n } = useContext()
    const { dataSourceLabel, deedTypeLabel, listingPurposeLabel } =
      useProperty(i18n)

    return { dataSourceLabel, deedTypeLabel, listingPurposeLabel }
  },

  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>
