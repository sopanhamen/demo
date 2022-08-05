<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
    <form-field-input
      v-model="model.phone"
      :label="$t('contact.phone')"
      :placeholder="$t('contact.phone')"
    />
    <form-field-input
      v-model="model.email"
      :label="$t('contact.email')"
      :placeholder="$t('contact.email')"
    />
    <form-field-input
      v-model="model.nationalId"
      :label="$t('person.national_id_number')"
      :placeholder="$t('person.national_id_number')"
    />
    <form-field-input
      v-model="model.passport_number"
      :label="$t('person.passport_number')"
      :placeholder="$t('person.passport_number')"
    />
    <form-field-input
      v-model="model.telegram"
      :label="$t('social_media.telegram')"
      placeholder="@bopha"
    />
    <form-field-select
      v-model="model.country"
      :options="countries"
      :label="$t('location.country')"
      :placeholder="$t('common.select') + '...'"
      option-label="name"
      option-value="id"
    />
    <form-field-select
      v-model="model.province"
      :options="provinces"
      :label="$t('location.province')"
      :placeholder="$t('common.select') + '...'"
      option-label="name_en"
      option-value="id"
      filter
    />
    <form-field-select
      v-model="model.district"
      :options="districts"
      :label="$t('location.district')"
      :placeholder="$t('common.select') + '...'"
      option-label="name_en"
      option-value="id"
      filter
    />
    <form-field-select
      v-model="model.commune"
      :options="communes"
      :label="$t('location.commune')"
      :placeholder="$t('common.select') + '...'"
      option-label="name_en"
      option-value="id"
      filter
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      countries: 'country/getCountries',
      getProvinces: 'province/getProvincesByCountry',
      getDistricts: 'district/getDistrictsByProvince',
      getCommunes: 'commune/getCommunesByDistrict'
    }),
    provinces() {
      return this.getProvinces(this.value.country)
    },
    districts() {
      return this.getDistricts(this.value.province)
    },
    communes() {
      return this.getCommunes(this.value.district)
    },
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
