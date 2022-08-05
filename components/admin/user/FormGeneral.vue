<template>
  <panel :header="$t('common.general')" :toggleable="true">
    <div class="w-full mb-4">
      <form-field-select
        v-model="userRoles"
        :options="roles"
        :label="$t('common.role')"
        :errors="v$.userRoles && v$.userRoles.$errors"
        option-label="name"
        required
        multiple
      />
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-4 mb-4">
      <form-field-input
        v-model="position"
        :label="$t('profile.position')"
        :errors="v$.position && v$.position.$errors"
        @input="contactPosition = position"
      />
      <form-field-input
        v-model="name"
        :label="$t('common.name')"
        :errors="v$.name && v$.name.$errors"
        required
        @input="contactName = name"
      />

      <form-field-input
        v-model="email"
        type="email"
        :label="$t('common.email')"
        :errors="v$.email && v$.email.$errors"
        placeholder="johndoe@example.com"
        required
        @input="contactEmail = email"
      />
      <phone-number
        v-model="phone"
        :value="phone"
        :errors="v$.phone && v$.phone.$errors"
        name="new-phone"
        required
        @input="contactPrimaryPhone = phone"
      />
    </div>
    <div v-if="email" class="flex space-x-4 items-end mb-4">
      <qrcode-vue :value="verifyUrl" margin="5" />
      <span class="text-gray-400">{{ $t('common.save_qr_code') }}</span>
    </div>

    <pv-button
      v-if="!showPasswordInput"
      :label="$t('user.title.change_password')"
      icon="pi pi-lock"
      class="p-button-sm p-button-secondary mb-4"
      @click="editPassword = true"
    />
    <div
      v-else
      class="grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-4 mb-4"
    >
      <form-field-input
        v-model="password"
        :label="$t('common.password')"
        :errors="v$.password && v$.password.$errors"
        type="password"
        placeholder="****"
        required
      />
      <form-field-input
        v-model="passwordConfirmation"
        :label="$t('common.password_confirmation')"
        :errors="v$.passwordConfirmation && v$.passwordConfirmation.$errors"
        type="password"
        placeholder="****"
        required
      />
    </div>
    <div>
      <label class="font-bold text-sm mb-1">
        {{ $t('common.profile_picture') }}
      </label>
      <admin-form-upload-image
        :image="profile_picture ? profile_picture.url : null"
        @delete-image="profile_picture = null"
        @uploaded="profile_picture = $event"
      />
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-4 mb-4">
      <form-field-select-button
        v-model="showOnWebsite"
        class="mt-4"
        :label="$t('user.title.show_on_website')"
        :options="[
          { label: $t('common.show'), value: true },
          { label: $t('common.hide'), value: false }
        ]"
        option-value="value"
        option-label="label"
      />
      <form-field-select-button
        v-model="isActive"
        class="mt-4"
        :label="$t('user.title.status')"
        :options="[
          { label: $t('common.active'), value: true },
          { label: $t('common.inactive'), value: false }
        ]"
        option-value="value"
        option-label="label"
      />
    </div>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import {
  email,
  required,
  minLength,
  sameAs,
  requiredIf
} from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'user/getField',
  mutationType: 'user/updateField'
})

export default {
  name: 'AdminUserFormGeneral',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      userRoles: { required },
      name: { required, minLength: minLength(2) },
      email: { email, required },
      phone: {
        required,
        minLength: minLength(9)
      },
      password: {
        required: requiredIf(!this.id),
        minLength: minLength(5),
        sameAsPasswordConfirmation: sameAs(this.passwordConfirmation)
      },
      passwordConfirmation: {
        required: requiredIf(!this.id),
        sameAsPasswordConfirmation: sameAs(this.password)
      },
      showOnWebsite: { required },
      isActive: { required }
    }
  },

  data() {
    return {
      editPassword: false
    }
  },

  computed: {
    ...mapFields({
      id: 'form.id',
      name: 'form.name',
      contactName: 'form.profile.contact.name',
      position: 'form.profile.position',
      contactPosition: 'form.profile.contact.position',
      email: 'form.email',
      contactEmail: 'form.profile.contact.email',
      phone: 'form.phone',
      contactPrimaryPhone: 'form.profile.contact.primary_phone',
      password: 'form.password',
      passwordConfirmation: 'form.password_confirmation',
      userRoles: 'form.roles',
      profile_picture: 'form.profile.profile_picture',
      showOnWebsite: 'form.show_on_website',
      isActive: 'form.is_active'
    }),
    ...mapGetters({
      roles: 'role/getRoles'
    }),
    showPasswordInput() {
      if (this.id && this.editPassword) {
        return true
      }

      return !this.id
    },
    verifyUrl() {
      return `${this.$config.app.base_url}/verify?user=${this.email}`
    }
  }
}
</script>
