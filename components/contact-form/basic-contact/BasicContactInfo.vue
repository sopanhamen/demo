<template>
  <div class="w-full divide-y-2 divide-primary p-2 sm:p-6 rounded">
    <div class="space-y-3 sm:space-y-6 pt-4 sm:pt-6">
      <h2 class="text-primary text-2xl sm:text-4xl font-bold">
        {{ company.name }}
      </h2>
      <p class="text-lg sm:text-3xl">
        {{ company.address }}
      </p>
      <div class="mt-4 sm:mt-7 mb-2">
        <a :href="company.facebook" target="_blank">
          <i class="pi pi-facebook text-2xl sm:text-4xl hover:text-primary" />
        </a>
      </div>
    </div>
    <div
      class="font-bold space-y-2 sm:space-y-4 text-gray-600 pb-4 sm:pb-8 pt-2"
    >
      <p>
        {{ $t('common.phone') }}: &nbsp;<span class="text-gray-900">{{
          company.primary_phone
        }}</span>
      </p>
      <p>
        {{ $t('common.mobile') }}: &nbsp;<span class="text-gray-900">{{
          company.secondary_phone
        }}</span>
      </p>
      <p>
        {{ $t('common.email') }}: &nbsp;<span class="text-gray-900">{{
          company.email
        }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getCompany: 'company/getCompanies'
    }),
    company() {
      return {
        name: this.getCompany[0]?.name || '',
        address: this.getCompany[0]?.address || '',
        email: this.getCompany[0]?.email || '',
        primary_phone: this.getCompany[0]?.primary_phone || '',
        secondary_phone: this.getCompany[0]?.secondary_phone || '',
        facebook: this.getCompany[0]?.facebook || ''
      }
    }
  }
}
</script>
