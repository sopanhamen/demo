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
const { mapFields } = createHelpers({
  getterType: 'province/getField',
  mutationType: 'province/updateField'
})
export default {
  name: 'ProvinceForm',
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
      published: {
        required
      }
    }
  },
  data() {
    return {
      countries: []
    }
  },
  async fetch() {
    this.countries = await this.$store.getters['country/getCountries']
  },
  computed: {
    ...mapFields({
      nameKhmer: 'form.name_km',
      nameEnglish: 'form.name_en',
      country: 'form.country_id',
      published: 'form.published'
    })
  }
}
</script>
