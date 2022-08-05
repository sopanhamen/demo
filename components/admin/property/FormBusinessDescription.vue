<template>
  <panel :header="$t('property.title.business_description')" :toggleable="true">
    <div class="grid-container">
      <form-field-input-group
        v-model="stockValue"
        :label="$t('property.model.business.stock_value')"
        :errors="v$.stockValue && v$.stockValue.$errors"
        :placeholder="$t('common.number_only')"
        add-on-text="$"
        type="number"
        position="right"
        color="bg-gray-200"
      />
      <form-field-input-group
        v-model="fixtureValue"
        :label="$t('property.model.business.fixture_value')"
        :errors="v$.fixtureValue && v$.fixtureValue.$errors"
        :placeholder="$t('common.number_only')"
        add-on-text="$"
        type="number"
        position="right"
        color="bg-gray-200"
      />
      <form-field-input-group
        v-model="saleRevenue"
        :label="$t('property.model.business.sale_revenue')"
        :errors="v$.saleRevenue && v$.saleRevenue.$errors"
        :placeholder="$t('common.number_only')"
        :add-on-text="'$ / ' + $t('common.year')"
        type="number"
        position="right"
      />
      <form-field-input
        v-model="numberOfEmployees"
        :label="$t('property.model.business.number_of_employees')"
        :errors="v$.numberOfEmployees && v$.numberOfEmployees.$errors"
        :placeholder="$t('common.number_only')"
        type="number"
      />
      <form-field-input-group
        v-model="tradingHours"
        :label="$t('property.model.business.trading_hours')"
        :errors="v$.tradingHours && v$.tradingHours.$errors"
        :placeholder="$t('common.number_only')"
        :add-on-text="$t('common.hour') + ' / ' + $t('common.week')"
        type="number"
        position="right"
      />
      <form-field-input
        v-model="expansionPotential"
        :label="$t('property.model.business.expansion_potential')"
        :errors="v$.expansionPotential && v$.expansionPotential.$errors"
      />
      <form-field-input
        v-model="yearEstablish"
        :label="$t('property.model.business.year_establish')"
        :errors="v$.yearEstablish && v$.yearEstablish.$errors"
        type="number"
      />
      <form-field-input
        v-model="sellingReason"
        :label="$t('property.model.business.selling_reason')"
        :errors="v$.sellingReason && v$.sellingReason.$errors"
      />
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  computed: {
    ...mapFields({
      stockValue: 'form.detail.stock_value',
      fixtureValue: 'form.detail.fixture_value',
      saleRevenue: 'form.detail.sale_revenue',
      numberOfEmployees: 'form.detail.number_of_employees',
      tradingHours: 'form.detail.trading_hours',
      expansionPotential: 'form.detail.expansion_potential',
      yearEstablish: 'form.detail.year_establish',
      sellingReason: 'form.detail.selling_reason'
    })
  }
}
</script>

<style lang="postcss" scoped>
.grid-container {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 mt-px;
}
</style>
