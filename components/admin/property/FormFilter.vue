<template>
  <div class="bg-gray-50 p-5 py-8 rounded">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <form-field-select
        v-model="propertyType"
        :options="propertyTypes"
        :label="$t('property_type.label')"
        :errors="v$.propertyType && v$.propertyType.$errors"
        option-label="name"
        option-value="id"
        required
        filter
      />
      <form-field-select
        v-model="listingPurpose"
        :options="purposes"
        :label="$t('listing_purpose.label')"
        :errors="v$.listingPurpose && v$.listingPurpose.$errors"
        option-label="label"
        option-value="value"
        required
        :show-clear="false"
      />
      <form-field-select-button
        v-model="formLayout"
        :options="layouts"
        :label="$t('form_layout.label')"
        :errors="v$.formLayout && v$.formLayout.$errors"
        option-value="value"
        field-class="grid grid-cols-3 items-center"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { FormLayoutIcon } from '@/enums/FormLayout'
const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      propertyType: { required },
      listingPurpose: { required },
      formLayout: { required }
    }
  },

  computed: {
    ...mapFields({
      propertyType: 'form.property_type_id',
      listingPurpose: 'form.listing_purpose',
      formLayout: 'form.other.form_layout'
    }),
    ...mapGetters({
      propertyTypes: 'propertyType/getPropertyTypes',
      listingPurposes: 'resource/getListingPurposes',
      formLayouts: 'resource/getFormLayouts'
    }),
    purposes() {
      return this.listingPurposes.map((purpose) => ({
        value: purpose.value,
        label: this.$t('listing_purpose.model.' + purpose.label)
      }))
    },
    layouts() {
      return this.listingPurposes.map((formLayout) => ({
        value: formLayout.value,
        icon: FormLayoutIcon[formLayout.value]
      }))
    }
  }
}
</script>
