<template>
  <div class="border rounded-md bg-white font-semibold text-sm text-gray-600">
    <div class="p-4 border-b">
      <p class="text-red-500 text-lg">
        {{ $t('common.general_information') }}
      </p>
    </div>
    <div class="grid lg:grid-cols-2 grid-cols-1 p-5 gap-5">
      <div class="space-y-3">
        <form-field-input
          v-model="name"
          :label="$t('common.name')"
          :errors="v$.name && v$.name.$errors"
          required
        />
        <form-field-select
          v-model="institute"
          :options="institutes"
          :label="$t('common.institute')"
          :errors="v$.institute && v$.institute.$errors"
          option-label="name"
          option-value="code"
        />
        <phone-number
          v-model="primaryPhone"
          :label="$t('contact.primary_phone')"
          :errors="v$.primaryPhone && v$.primaryPhone.$errors"
          icon="pi pi-phone"
          color="bg-gray-200"
          required
        />
        <phone-number
          v-model="secondaryPhone"
          :label="$t('contact.secondary_phone')"
          :errors="v$.secondaryPhone && v$.secondaryPhone.$errors"
          icon="pi pi-phone"
          color="bg-gray-200"
        />
        <form-field-input
          v-model="email"
          :label="$t('common.email')"
          :errors="v$.email && v$.email.$errors"
          placeholder="info@example.com"
        />
        <form-field-input
          v-model="website"
          :label="$t('common.website')"
          :errors="v$.website && v$.website.$errors"
          placeholder="www.example.com"
        />
      </div>
      <div class="space-y-4">
        <form-field-radio
          v-model="published"
          :label="$t('common.published')"
          :options="[
            { label: $t('common.publish'), value: true },
            { label: $t('common.un_publish'), value: false }
          ]"
          :errors="v$.published && v$.published.$errors"
          required
        />
        <div>
          <p class="block mb-1 font-bold">{{ $t('common.logo') }}</p>
          <upload-component :img-center="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, url } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'bank/getField',
  mutationType: 'bank/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      name: { required, minLength: minLength(2) },
      primaryPhone: { required, minLength: minLength(9) },
      secondaryPhone: { minLength: minLength(9) },
      thirdPhone: { minLength: minLength(9) },
      email: { email },
      website: { url },
      published: { required }
    }
  },

  data() {
    return {
      institute: null,
      institutes: [
        { name: 'Commercial Bank', code: 1 },
        { name: 'Specialize Bank', code: 2 },
        { name: 'Microfinance Solution', code: 3 },
        { name: 'Leasing Company', code: 4 }
      ]
    }
  },

  computed: {
    ...mapFields({
      name: 'form.bank_name',
      primaryPhone: 'form.primary_phone',
      secondaryPhone: 'form.secondary_phone',
      thirdPhone: 'form.third_phone',
      email: 'form.email',
      website: 'form.website',
      published: 'form.published'
    })
  }
}
</script>
