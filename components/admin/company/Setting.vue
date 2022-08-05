<template>
  <panel :header="$t('company.title.setting')">
    <div class="space-y-3">
      <form-field-input
        v-model="prefixCode"
        :label="$t('company.model.property_code_prefix')"
        placeholder="CODE-"
        :errors="v$.prefixCode && v$.prefixCode.$errors"
        required
      />
      <form-field-input
        v-model="propertyCodeDigit"
        :label="$t('company.model.property_code_digit')"
        :placeholder="$t('common.enter')"
        :errors="v$.propertyCodeDigit && v$.propertyCodeDigit.$errors"
      />
    </div>
    <div class="space-y-3">
      <form-field-input
        v-model="prefixCodeUnlisting"
        :label="$t('company.model.unlisting_code_prefix')"
        placeholder="CODE-"
        :errors="v$.prefixCodeUnlisting && v$.prefixCodeUnlisting.$errors"
        required
      />
      <form-field-input
        v-model="propertyCodeDigitUnlisting"
        :label="$t('company.model.unlisting_code_digit')"
        :placeholder="$t('common.enter')"
        :errors="
          v$.propertyCodeDigitUnlisting && v$.propertyCodeDigitUnlisting.$errors
        "
      />
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { maxValue, required } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters } from 'vuex'

const { mapFields } = createHelpers({
  getterType: 'company/getField',
  mutationType: 'company/updateField'
})

export default {
  name: 'CompanyFormSetting',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      prefixCode: {
        required
      },
      propertyCodeDigit: {
        maxValue: maxValue(10)
      },
      prefixCodeUnlisting: {
        required
      },
      propertyCodeDigitUnlisting: {
        maxValue: maxValue(10)
      }
    }
  },

  computed: {
    ...mapGetters({
      getCompany: 'resource/getCompany'
    }),
    ...mapFields({
      prefixCode: 'form.property_code_prefix',
      propertyCodeDigit: 'form.property_code_digit',
      prefixCodeUnlisting: 'form.property_code_prefix_unlisting',
      propertyCodeDigitUnlisting: 'form.property_code_digit_unlisting'
    })
  }
}
</script>
