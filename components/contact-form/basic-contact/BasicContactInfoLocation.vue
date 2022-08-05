<template>
  <div class="w-full p-6 md:p-8 rounded space-y-4 sm:space-y-6">
    <h2 class="text-2xl text-primary md:text-3xl font-bold">
      {{ $t('contact.how_to_find_us') }}
    </h2>
    <div class="space-y-2">
      <div class="relative">
        <div :class="classStyle" class="absolute top-0 left-0">
          <i class="pi pi-phone text-lg" />
        </div>
        <a class="pl-10 leading-8">{{ company.primary_phone }}</a>
      </div>
      <div class="relative">
        <div :class="classStyle" class="absolute top-0 left-0">
          <i class="pi pi-envelope text-lg" />
        </div>
        <a class="pl-10 leading-8">{{ company.email }}</a>
      </div>
      <div class="relative">
        <div :class="classStyle" class="absolute top-0 left-0">
          <i class="pi pi-home text-lg" />
        </div>
        <a class="pl-10 leading-8"> {{ company.address }}</a>
      </div>
    </div>
    <h2 class="text-lg md:text-xl font-bold">
      {{ $t('contact.opening_hours') }}
    </h2>
    <p>{{ props.openingHour }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    props: {
      type: Object,
      default() {
        return {
          openingHour: ''
        }
      }
    }
  },

  data() {
    return {
      classStyle:
        'bg-gray-200  w-8 h-8 flex justify-center items-center rounded-full'
    }
  },

  computed: {
    ...mapGetters({
      getCompany: 'company/getCompanies'
    }),
    company() {
      return {
        address: this.getCompany[0]?.address || '',
        email: this.getCompany[0]?.email || '',
        primary_phone: this.getCompany[0]?.primary_phone || ''
      }
    }
  }
}
</script>
