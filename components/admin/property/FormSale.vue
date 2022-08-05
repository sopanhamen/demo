<template>
  <panel :header="$t('property.title.sale_info')" :toggleable="true">
    <pv-fieldset v-if="isForSale" class="mb-4">
      <template #legend>
        <label class="text-indigo-600 text-sm">
          {{ $t('common.for_sale') }}
        </label>
      </template>
      <div class="two-grid-container">
        <form-field-input-group
          v-model="sellingPrice"
          :label="$t('property.model.selling_price')"
          :placeholder="$t('common.number_only')"
          :errors="v$.sellingPrice && v$.sellingPrice.$errors"
          icon="pi pi-dollar"
          color="bg-gray-200"
        />
        <form-field-select
          v-model="sellingPriceType"
          :options="priceTypes"
          :label="$t('price_type.label')"
          :errors="v$.sellingPriceType && v$.sellingPriceType.$errors"
          :show-clear="false"
          option-label="label"
          option-value="value"
        />
      </div>
    </pv-fieldset>
    <pv-fieldset v-if="isForRent" class="mb-4">
      <template #legend>
        <label class="text-yellow-600 text-sm">
          {{ $t('common.for_rent') }}
        </label>
      </template>
      <div class="two-grid-container mb-4">
        <form-field-input-group
          v-model="rentPrice"
          :label="$t('property.model.renting_price')"
          :placeholder="$t('common.number_only')"
          :errors="v$.rentPrice && v$.rentPrice.$errors"
          icon="pi pi-dollar"
          color="bg-gray-200"
        />
        <form-field-select
          v-model="rentPriceType"
          :options="priceTypes"
          :label="$t('price_type.label')"
          :errors="v$.rentPriceType && v$.rentPriceType.$errors"
          :show-clear="false"
          option-label="label"
          option-value="value"
        />
        <form-field-input-group
          v-model="rentingTerms"
          :label="$t('property.model.renting_terms')"
          :placeholder="$t('common.number_only')"
          :add-on-text="$t('common.year')"
          :errors="v$.rentingTerms && v$.rentingTerms.$errors"
          position="right"
        />
        <form-field-input-group
          v-model="rentingDeposit"
          :label="$t('property.model.renting_deposit')"
          :placeholder="$t('common.number_only')"
          :add-on-text="$t('common.month')"
          :errors="v$.rentingDeposit && v$.rentingDeposit.$errors"
          position="right"
        />
      </div>
      <form-field-input
        v-model="taxNote"
        :label="$t('property.model.tax_note')"
        :errors="v$.taxNote && v$.taxNote.$errors"
      />
    </pv-fieldset>
    <div class="mt-4">
      <form-field-select-button
        v-model="listingStatus"
        :options="listingStatuses"
        :label="$t('listing_status.label')"
        :errors="v$.listingStatus && v$.listingStatus.$errors"
        option-value="value"
        option-label="label"
        field-class="grid grid-cols-5 items-center"
      />
    </div>
    <div class="mt-4">
      <form-field-input-group
        v-model="commission"
        :label="$t('property.model.commission')"
        :placeholder="$t('common.number_only')"
        icon="pi pi-percentage"
        :errors="v$.commission && v$.commission.$errors"
        position="right"
      />
    </div>
    <div class="mt-4">
      <form-field-textarea
        v-model="saleNote"
        :label="$t('common.note')"
        :errors="v$.saleNote && v$.saleNote.$errors"
      />
    </div>
  </panel>
</template>

<script>
import { mapGetters } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { createHelpers } from 'vuex-map-fields'
import { ListingPurpose } from '@/enums/ListingPurpose'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      purposes: ListingPurpose
    }
  },

  computed: {
    ...mapFields({
      purpose: 'form.listing_purpose',
      sellingPrice: 'form.selling_price',
      sellingPriceType: 'form.selling_price_type',
      rentPrice: 'form.renting_price',
      rentPriceType: 'form.renting_price_type',
      commission: 'form.commission',
      saleNote: 'form.sale_note',
      listingStatus: 'form.listing_status',
      rentingTerms: 'form.renting_terms',
      rentingDeposit: 'form.renting_deposit',
      taxNote: 'form.tax_note'
    }),
    ...mapGetters({
      getPriceTypes: 'resource/getPriceTypes',
      getListingStatuses: 'resource/getListingStatuses'
    }),
    priceTypes() {
      return this.getPriceTypes.map((priceType) => ({
        value: priceType.value,
        label: this.$t('price_type.model.' + priceType.label)
      }))
    },
    listingStatuses() {
      return this.getListingStatuses.map((listingStatus) => ({
        value: listingStatus.value,
        label: this.$t('listing_status.model.' + listingStatus.label)
      }))
    },
    isForRent() {
      return (
        this.purpose === this.purposes.RENT ||
        this.purpose === this.purposes.RENT_OR_SALE
      )
    },
    isForSale() {
      return (
        this.purpose === this.purposes.SALE ||
        this.purpose === this.purposes.RENT_OR_SALE
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.two-grid-container {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 mt-px;
}

.three-grid-container {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-2 gap-y-4 xl:gap-5 mt-px;
}
</style>
