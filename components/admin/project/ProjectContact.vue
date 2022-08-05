<template>
  <div class="border rounded-md bg-white font-semibold text-sm text-gray-600">
    <div class="p-4 border-b">
      <p class="text-red-500 text-lg">{{ $t('contact.label') }}</p>
    </div>
    <div class="space-y-3 p-4">
      <phone-number
        v-model="primaryPhone"
        :value="primaryPhone"
        :label="$t('contact.primary_phone')"
        :errors="v$.primaryPhone && v$.primaryPhone.$errors"
      />
      <phone-number
        v-model="secondaryPhone"
        :value="secondaryPhone"
        :label="$t('contact.secondary_phone')"
        :errors="v$.secondaryPhone && v$.secondaryPhone.$errors"
      />
      <form-field-input
        v-model="email"
        :label="$t('common.email')"
        :errors="v$.email && v$.email.$errors"
        placeholder="info@example.com"
      />
      <form-field-input
        v-model="facebook"
        :label="$t('common.facebook')"
        :errors="v$.facebook && v$.facebook.$errors"
        placeholder="www.facebook.com/"
      />
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { minLength, email } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'project/getField',
  mutationType: 'project/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      primaryPhone: { minLength: minLength(9) },
      secondaryPhone: { minLength: minLength(9) },
      email: { email }
    }
  },
  computed: {
    ...mapFields({
      primaryPhone: 'form.primary_phone',
      secondaryPhone: 'form.secondary_phone',
      email: 'form.email',
      facebook: 'form.facebook'
    })
  }
}
</script>
