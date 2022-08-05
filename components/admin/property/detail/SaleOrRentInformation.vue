<template>
  <panel :header="$t('property.title.sale_and_rent_info')" :toggleable="true">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
      <text-block
        :label="$t('listing_status.label')"
        :description="listingStatusLabel(property.listing_status)"
      />
      <text-block
        :label="$t('listing_purpose.label')"
        :description="listingPurposeLabel(property.listing_purpose)"
      />
    </div>
    <div v-if="isPropertyForSale(property)">
      <h4 class="text-sm mb-1 text-gray-500">
        {{ $t('property.title.sale_info') }}
      </h4>
      <div class="contact-box">
        <text-block
          :label="$t('property.model.selling_price')"
          :description="sellingPrice"
        />
      </div>
    </div>
    <div v-if="isPropertyForRent(property)">
      <h4 class="text-sm mb-1 text-gray-500">
        {{ $t('property.title.rent_info') }}
      </h4>
      <div class="contact-box">
        <text-block
          :label="$t('property.model.renting_price')"
          :description="rentingPrice"
        />
        <text-block
          :label="$t('property.model.tax_note')"
          :description="property.tax_note"
        />
        <text-block
          :label="$t('property.model.renting_terms')"
          :description="property.renting_terms"
        />
        <text-block
          :label="$t('property.model.renting_deposit')"
          :description="property.renting_deposit"
        />
      </div>
    </div>
    <text-block :label="$t('common.note')" :description="property.sale_note" />
  </panel>
</template>

<script>
import { mapState } from 'vuex'
import useProperty from '@/composables/useProperty'

export default {
  setup() {
    const {
      formatPrice,
      formatPriceType,
      isPropertyForRent,
      isPropertyForSale,
      listingStatusLabel,
      listingPurposeLabel
    } = useProperty()

    return {
      formatPrice,
      formatPriceType,
      isPropertyForRent,
      isPropertyForSale,
      listingStatusLabel,
      listingPurposeLabel
    }
  },

  computed: {
    ...mapState({
      property: (state) => state.property.selectedProperty || {}
    }),
    sellingPrice() {
      return this.formatPrice(
        this.property.selling_price,
        this.property.selling_price_type
      )
    },
    rentingPrice() {
      return this.formatPrice(
        this.property.renting_price,
        this.property.renting_price_type
      )
    }
  }
}
</script>

<style lang="postcss" scoped>
.contact-box {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-4 p-5 rounded-md;
  @apply bg-white border mb-4;
}
</style>
