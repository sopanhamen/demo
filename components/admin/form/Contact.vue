<template>
  <div :class="containerClass">
    <admin-form-field-auto-complete-contact
      v-if="isDefined('name')"
      :value="value.name"
      :required="isRequired('name')"
      :readonly="isReadonly('name')"
      :external-errors="externalErrors['contact.name']"
      :errors="v$.value && v$.value.name && v$.value.name.$errors"
      @input="update('name', $event)"
      @completed="complete($event)"
    />
    <phone-number
      v-if="isDefined('phone')"
      :value="value.phone"
      :label="$t('contact.phone')"
      :errors="v$.value && v$.value.phone && v$.value.phone.$errors"
      :external-errors="externalErrors['contact.phone']"
      :required="isRequired('phone')"
      :readonly="isReadonly('phone')"
      @input="update('phone', $event)"
    />
    <phone-number
      v-if="isDefined('primary_phone')"
      :value="value.primary_phone"
      :label="$t('contact.primary_phone')"
      :errors="
        v$.value && v$.value.primary_phone && v$.value.primary_phone.$errors
      "
      :external-errors="externalErrors['contact.primary_phone']"
      :required="isRequired('primary_phone')"
      :readonly="isReadonly('primary_phone')"
      @input="update('primary_phone', $event)"
    />
    <phone-number
      v-if="isDefined('secondary_phone')"
      :value="value.secondary_phone"
      :label="$t('contact.secondary_phone')"
      :errors="
        v$.value && v$.value.secondary_phone && v$.value.secondary_phone.$errors
      "
      :required="isRequired('secondary_phone')"
      :readonly="isReadonly('secondary_phone')"
      @input="update('secondary_phone', $event)"
    />
    <form-field-input-group
      v-if="isDefined('email')"
      :value="value.email"
      :label="$t('contact.email')"
      :errors="v$.value && v$.value.email && v$.value.email.$errors"
      :required="isRequired('email')"
      :readonly="isReadonly('email')"
      placeholder="bopha@example.com"
      icon="pi pi-envelope"
      color="bg-gray-200"
      @input="update('email', $event)"
    />
    <form-field-select
      v-if="isDefined('gender')"
      :value="value.gender"
      :options="genders"
      :label="$t('gender.label')"
      :placeholder="$t('common.select') + '...'"
      :errors="v$.gender && v$.gender.$errors"
      :required="isRequired('gender')"
      :show-clear="false"
      option-label="label"
      option-value="value"
      @input="update('gender', $event)"
    />
    <form-field-input-group
      v-if="isDefined('national_id_number')"
      :value="value.national_id_number"
      :label="$t('person.national_id_number')"
      :errors="
        v$.value &&
        v$.value.national_id_number &&
        v$.value.national_id_number.$errors
      "
      :required="isRequired('national_id_number')"
      :readonly="isReadonly('national_id_number')"
      icon="pi pi-user"
      color="bg-gray-200"
      @input="update('national_id_number', $event)"
    />
    <form-field-input-group
      v-if="isDefined('passport_number')"
      :value="value.passport_number"
      :label="$t('person.passport_number')"
      :errors="
        v$.value && v$.value.passport_number && v$.value.passport_number.$errors
      "
      :required="isRequired('passport_number')"
      :readonly="isReadonly('passport_number')"
      icon="pi pi-id-card"
      color="bg-gray-200"
      @input="update('passport_number', $event)"
    />
    <form-field-input-group
      v-if="isDefined('website')"
      :value="value.website"
      :label="$t('common.website')"
      :errors="v$.value && v$.value.website && v$.value.website.$errors"
      :required="isRequired('website')"
      :readonly="isReadonly('website')"
      placeholder="www.website.com"
      icon="pi pi-globe"
      color="bg-gray-200"
      @input="update('website', $event)"
    />
    <form-field-input-group
      v-if="isDefined('telegram')"
      :value="value.telegram"
      :label="$t('social_media.telegram')"
      :errors="v$.value && v$.value.telegram && v$.value.telegram.$errors"
      :required="isRequired('telegram')"
      :readonly="isReadonly('telegram')"
      placeholder="link or username"
      icon="pi pi-telegram"
      color="bg-gray-200"
      @input="update('telegram', $event)"
    />
    <form-field-input-group
      v-if="isDefined('line')"
      :value="value.line"
      :label="$t('social_media.line')"
      :errors="v$.value && v$.value.line && v$.value.line.$errors"
      :required="isRequired('line')"
      :readonly="isReadonly('line')"
      placeholder="https://line.me/ti/p/line_id"
      icon="fa-brands fa-line"
      color="bg-gray-200"
      @input="update('line', $event)"
    />
    <form-field-input-group
      v-if="isDefined('facebook')"
      :value="value.facebook"
      :label="$t('social_media.facebook')"
      :errors="v$.value && v$.value.facebook && v$.value.facebook.$errors"
      :required="isRequired('facebook')"
      :readonly="isReadonly('facebook')"
      placeholder="https://www.facebook.com/bopha"
      icon="pi pi-facebook"
      color="bg-gray-200"
      @input="update('facebook', $event)"
    />
    <slot name="extra"></slot>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { Gender, GenderLabel } from '@/enums/Gender'

export default {
  name: 'FormContact',
  props: {
    value: {
      type: Object,
      required: true
    },
    validation: {
      type: Object,
      default() {
        return {}
      }
    },
    readonlyFields: {
      type: Array,
      default() {
        return []
      }
    },
    containerClass: {
      type: [Array, Object, String],
      default: 'grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5'
    },
    externalErrors: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      phone: '',
      primary_phone: '',
      secondary_phone: ''
    }
  },

  validations() {
    return {
      value: { ...this.validation }
    }
  },

  computed: {
    genders() {
      return Object.values(Gender).map((gender) => ({
        value: gender,
        label: this.$t(`gender.model.${GenderLabel[gender]}`)
      }))
    }
  },

  watch: {
    value: {
      handler(value) {
        this.phone = value.phone
        this.primary_phone = value.primary_phone
        this.secondary_phone = value.secondary_phone
      }
    }
  },

  methods: {
    isDefined(key) {
      return typeof this.value[key] !== 'undefined'
    },
    update(key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    },
    complete(event) {
      const values = {}
      if (event.value.id) {
        values.id = event.value.id
      }

      if (typeof this.value.name !== 'undefined') {
        values.name = event.value.name
      }

      if (typeof this.value.phone !== 'undefined') {
        values.phone = event.value.phone
      }

      if (typeof this.value.primary_phone !== 'undefined') {
        values.primary_phone = event.value.primary_phone
      }

      if (typeof this.value.secondary_phone !== 'undefined') {
        values.secondary_phone = event.value.secondary_phone
      }

      if (typeof this.value.email !== 'undefined') {
        values.email = event.value.email
      }

      if (typeof this.value.telegram !== 'undefined') {
        values.telegram = event.value.telegram
      }

      if (typeof this.value.line !== 'undefined') {
        values.line = event.value.line
      }

      if (typeof this.value.facebook !== 'undefined') {
        values.facebook = event.value.facebook
      }

      this.$emit('input', { ...this.value, ...values })
    },
    isRequired(input) {
      const findRule = Object.entries(this.validation).find(
        ([key, value]) => value.required && key === input
      )
      return findRule ? findRule.length > 0 : false
    },
    isReadonly(input) {
      return (
        this.readonlyFields === ['*'] || this.readonlyFields.includes(input)
      )
    }
  }
}
</script>
