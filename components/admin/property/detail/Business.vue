<template>
  <panel :header="$t('property.title.business_description')" :toggleable="true">
    <div v-if="property" class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
      <text-block
        :label="$t('property.model.business.stock_value')"
        :description="property.detail.stock_value"
      />
      <text-block
        :label="$t('property.model.business.fixture_value')"
        :description="property.detail.fixture_value"
      />
      <text-block
        :label="$t('property.model.business.sale_revenue')"
        :description="property.detail.sale_revenue"
      />
      <text-block
        :label="$t('property.model.business.number_of_employees')"
        :description="property.detail.number_of_employees"
      />
      <text-block
        :label="$t('property.model.business.trading_hours')"
        :description="property.detail.trading_hours"
      />
      <text-block
        :label="$t('property.model.business.expansion_potential')"
        :description="property.detail.expansion_potential"
      />
      <text-block
        :label="$t('property.model.business.year_establish')"
        :description="property.detail.year_establish"
      />
      <text-block
        :label="$t('property.model.business.selling_reason')"
        :description="property.detail.selling_reason"
      />
    </div>
  </panel>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AdminPropertyDetailBusiness',

  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    })
  }
}
</script>
