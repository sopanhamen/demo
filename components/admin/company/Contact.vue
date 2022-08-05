<template>
  <panel :header="$t('company_info.contact')">
    <div class="space-y-3">
      <div>
        <p class="pb-2 font-bold">
          {{ $t('common.address') }}
        </p>
        <input-text
          v-model="address"
          type="text"
          class="w-full h-10"
          :placeholder="$t('common.enter')"
        />
        <div v-if="v$.address">
          <small
            v-for="error of v$.address.$errors"
            :key="error.$uuid"
            class="p-invalid text-red-500"
          >
            {{ error.$message }}
          </small>
        </div>
      </div>
      <phone-number
        v-model="primaryPhone"
        :label="$t('company.model.primary_phone')"
        :errors="v$.primaryPhone && v$.primaryPhone.$errors"
        required
      />
      <phone-number
        v-model="secondaryPhone"
        :label="$t('company.model.secondary_phone')"
        :errors="v$.secondaryPhone && v$.secondaryPhone.$errors"
      />
      <form-field-input-group
        v-model="email"
        :label="$t('common.email')"
        :placeholder="$t('common.enter')"
        :errors="v$.email && v$.email.$errors"
        icon="pi pi-envelope"
        color="bg-gray-200"
      />
      <form-field-input-group
        v-model="facebook"
        :label="$t('social_media.facebook')"
        placeholder="https://facebook.com/bopha"
        icon="pi pi-facebook"
        color="bg-gray-200"
      />
      <form-field-input-group
        v-model="telegram"
        :label="$t('social_media.telegram')"
        placeholder="https://telegram.com/bopha"
        icon="pi pi-telegram"
        color="bg-gray-200"
      />
      <form-field-input-group
        v-model="youtube"
        :label="$t('social_media.youtube')"
        placeholder="https://youtube.com/bopha"
        icon="pi pi-youtube"
        color="bg-gray-200"
      />
      <form-field-input-group
        v-model="linkedIn"
        :label="$t('social_media.linkedin')"
        placeholder="https://linkedin.com/bopha"
        icon="pi pi-linkedin"
        color="bg-gray-200"
      />
      <form-field-input-group
        v-model="instagram"
        :label="$t('social_media.instagram')"
        placeholder="https://instagram.com/bopha"
        icon="pi pi-instagram"
        color="bg-gray-200"
      />
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'company/getField',
  mutationType: 'company/updateField'
})
export default {
  name: 'CompanyFormContact',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      primaryPhone: {
        required,
        minLength: minLength(9)
      },
      secondaryPhone: {
        minLength: minLength(9)
      },
      email: {
        email
      }
    }
  },
  computed: {
    ...mapFields({
      address: 'form.address',
      primaryPhone: 'form.primary_phone',
      secondaryPhone: 'form.secondary_phone',
      email: 'form.email',
      facebook: 'form.facebook',
      telegram: 'form.telegram',
      youtube: 'form.youtube',
      linkedIn: 'form.linked_in',
      instagram: 'form.instagram'
    })
  }
}
</script>
