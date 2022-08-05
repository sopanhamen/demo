<template>
  <div>
    <div class="border rounded-md bg-white font-semibold text-sm text-gray-600">
      <div class="p-4 border-b">
        <p class="text-red-500 text-lg">
          {{ $t('common.general_information') }}
        </p>
      </div>
      <div class="space-y-3 p-4">
        <form-field-select
          v-model="institute"
          :options="institutes"
          :label="$t('common.institute')"
          :errors="v$.institute && v$.institute.$errors"
          option-label="name"
          option-value="code"
        />
        <form-field-select
          v-model="bank"
          :options="banks"
          :label="$t('common.bank')"
          :errors="v$.bank && v$.bank.$errors"
          option-label="bank_name"
          option-value="id"
          required
        />
        <form-field-input
          v-model="branchName"
          :label="$t('common.name')"
          :errors="v$.branchName && v$.branchName.$errors"
          required
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
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'bankBranch/getField',
  mutationType: 'bankBranch/updateField'
})

export default {
  name: 'BankBranchGeneralInformation',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      bank: {
        required
      },
      branchName: {
        required,
        minLength: minLength(2)
      },
      primaryPhone: {
        required,
        minLength: minLength(9)
      },
      secondaryPhone: {
        minLength: minLength(9)
      },
      thirdPhone: {
        minLength: minLength(9)
      },
      email: {
        email
      },
      published: {
        required
      }
    }
  },

  data() {
    return {
      institute: null,
      banks: [],
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
      bank: 'form.bank_id',
      branchName: 'form.branch_name',
      primaryPhone: 'form.primary_phone',
      secondaryPhone: 'form.secondary_phone',
      thirdPhone: 'form.third_phone',
      email: 'form.email',
      published: 'form.published'
    })
  },

  async mounted() {
    // todo: remove this because banks will be retrieved after login and cache instead
    await this.$store.dispatch('bank/fetchAllBanks')
    this.banks = await this.$store.getters['bank/getBanks']
  }
}
</script>
