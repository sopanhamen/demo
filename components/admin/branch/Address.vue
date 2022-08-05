<template>
  <div>
    <div class="border rounded-md bg-white font-semibold text-sm text-gray-600">
      <div class="p-4 border-b">
        <p class="text-red-500 text-lg">{{ $t('common.address') }}</p>
      </div>
      <div class="grid md:grid-cols-2 grid-cols-1 p-4 gap-4">
        <form-field-select
          v-model="country"
          :options="countries"
          :label="$t('location.country')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.country && v$.country.$errors"
          option-label="name"
          option-value="id"
          required
          @change="handleCountryChanged"
        />
        <form-field-select
          v-model="province"
          :options="provinces"
          :label="$t('location.province')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.province && v$.province.$errors"
          option-label="name_en"
          option-value="id"
          required
          @change="handleProvinceChanged"
        />
        <form-field-select
          v-model="district"
          :options="districts"
          :label="$t('location.district')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.district && v$.district.$errors"
          option-label="name_en"
          option-value="id"
          required
          @change="handleDistrictChanged"
        />
        <form-field-select
          v-model="commune"
          :options="communes"
          :label="$t('location.commune')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.commune && v$.commune.$errors"
          option-label="name_en"
          option-value="id"
          required
        />
        <form-field-input
          v-model="village"
          :label="$t('location.village')"
          :errors="v$.village && v$.village.$errors"
        />
        <form-field-input
          v-model="street"
          :label="$t('location.street')"
          :errors="v$.street && v$.street.$errors"
        />
        <form-field-input
          v-model="house"
          :label="$t('location.house')"
          :errors="v$.house && v$.house.$errors"
        />
        <form-field-input
          v-model="floor"
          :label="$t('location.floor')"
          :errors="v$.floor && v$.floor.$errors"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { mapActions, mapGetters } from 'vuex'
const { mapFields } = createHelpers({
  getterType: 'bankBranch/getField',
  mutationType: 'bankBranch/updateField'
})

export default {
  name: 'BankBranchAddress',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      country: { required },
      province: { required },
      district: { required },
      commune: { required }
    }
  },

  computed: {
    ...mapFields({
      country: 'form.country_id',
      province: 'form.province_id',
      district: 'form.district_id',
      commune: 'form.commune_id',
      village: 'form.village',
      house: 'form.house',
      street: 'form.street',
      officeType: 'form.office_type',
      building: 'form.building',
      floor: 'form.floor',
      latLng: 'form.lat_lng'
    }),
    ...mapGetters({
      countries: 'country/getCountries',
      provinces: 'province/getProvinces',
      districts: 'district/getDistricts',
      communes: 'commune/getCommunes'
    })
  },

  methods: {
    ...mapActions({
      fetchProvinces: 'province/fetchAllProvincesByCountry',
      fetchDistricts: 'district/fetchAllDistrictsByProvince',
      clearDistricts: 'district/clearDistricts',
      fetchCommunes: 'commune/fetchAllCommunesByDistrict',
      clearCommunes: 'commune/clearCommunes'
    }),
    async handleCountryChanged() {
      // todo: implement with cache instead of fetch api all the time
      await this.fetchProvinces(this.country)
      this.clearDistricts()
      this.clearCommunes()
    },
    async handleProvinceChanged() {
      // todo: implement with cache instead of fetch api all the time
      await this.fetchDistricts(this.province)
      this.clearCommunes()
    },
    async handleDistrictChanged() {
      // todo: implement with cache instead of fetch api all the time
      await this.fetchCommunes(this.district)
    }
  }
}
</script>
