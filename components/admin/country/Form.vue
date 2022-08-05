<template>
  <div class="bg-gray-50 rounded">
    <h4 class="px-3 py-4 border-b-2 uppercase font-semibold text-red-600">
      {{ $t('common.general_information') }}
    </h4>
    <div class="px-3 grid grid-cols-1 lg:grid-cols-2 gap-8 py-5">
      <div class="space-y-5">
        <form-field-input
          v-model="countryName"
          :label="$t('common.name')"
          :errors="v$.countryName && v$.countryName.$errors"
        />
        <form-field-input
          v-model="isoCode"
          :label="$t('common.iso_code')"
          :errors="v$.isoCode && v$.isoCode.$errors"
        />
        <form-field-input
          v-model="code"
          :label="$t('common.code')"
          :errors="v$.code && v$.code.$errors"
        />
      </div>
      <!-- <div class="space-y-3">
        <p class="font-bold">{{ $t('user_role.published') }}</p>
        <form-field-input-switch
          v-model="published"
          :label="$t('common.publish')"
          :errors="v$.published && v$.published.$errors"
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
  getterType: 'country/getField',
  mutationType: 'country/updateField'
})

export default {
  name: 'NewCountryInformation',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      countryName: {
        required,
        minLength: minLength(2)
      },
      isoCode: {
        required
      },
      code: {
        required
      },
      published: {
        required
      }
    }
  },

  data() {
    return {}
  },
  computed: {
    ...mapFields({
      countryName: 'form.name',
      isoCode: 'form.iso_code',
      code: 'form.code',
      published: 'form.published'
    })
  }
}
</script>
