<template>
  <div class="bg-gray-50 rounded">
    <h4 class="px-3 py-4 border-b-2 uppercase font-semibold text-red-600">
      {{ $t('common.general_information') }}
    </h4>
    <div class="px-3 grid grid-cols-1 lg:grid-cols-2 gap-8 py-5">
      <div class="space-y-5">
        <form-field-input
          v-model="nameKhmer"
          :label="$t('common.name_km')"
          :errors="v$.nameKhmer && v$.nameKhmer.$errors"
          required
        />
        <form-field-input
          v-model="nameEnglish"
          :label="$t('common.name_en')"
          :errors="v$.nameEnglish && v$.nameEnglish.$errors"
          required
        />
        <form-field-select
          v-model="country"
          :options="countries"
          :label="$t('common.country')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.country && v$.country.$errors"
          option-label="name"
          option-value="id"
          filter
          required
        />
        <form-field-select
          v-model="province"
          :options="provinces"
          :label="$t('common.province')"
          :placeholder="$t('common.select') + '...'"
          :errors="v$.province && v$.province.$errors"
          option-label="name_en"
          option-value="id"
          filter
          required
        />
      </div>
      <!-- <div class="space-y-3">
        <p class="font-bold">{{ $t('common.published') }}</p>
        <form-field-input-switch
          v-model="published"
          :label="$t('common.publish')"
          :errors="v$.published && v$.published.$errors"
          required
        />
        <div v-if="v$.published">
          <small
            v-for="error of v$.published.$errors"
            :key="error.$uuid"
            class="p-invalid text-red-500"
          >
            {{ error.$message }}
          </small>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { mapGetters } from 'vuex'
const { mapFields } = createHelpers({
  getterType: 'district/getField',
  mutationType: 'district/updateField'
})
export default {
  name: 'DistrictForm',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      nameKhmer: {
        required,
        minLength: minLength(2)
      },
      nameEnglish: {
        required,
        minLength: minLength(2)
      },
      country: { required },
      province: { required },
      published: {
        required
      }
    }
  },
  computed: {
    ...mapFields({
      nameKhmer: 'form.name_km',
      nameEnglish: 'form.name_en',
      province: 'form.province_id',
      country: 'form.province.country_id',
      published: 'form.published'
    }),
    ...mapGetters({
      countries: 'country/getCountries',
      getProvincesByCountry: 'province/getProvincesByCountry'
    }),
    provinces() {
      return this.getProvincesByCountry([this.country])
    }
  }
}
</script>
