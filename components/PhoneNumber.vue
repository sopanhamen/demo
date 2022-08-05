<template>
  <div class="text-sm">
    <label class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <div class="p-inputgroup">
      <div class="p-inputgroup-addon py-2 bg-gray-200">
        <select v-model="countryCode" class="bg-transparent outline-none">
          <option
            v-for="country in countries"
            :key="country.id"
            :value="country.code"
          >
            {{ country.code }}
          </option>
        </select>
      </div>
      <input-text
        v-model="tempValue"
        :value="phoneNumber"
        :label="label"
        :errors="errors"
        :max-length="10"
        :min-length="9"
        placeholder="23000000"
        @input="handleInputPhone($event)"
      />
    </div>
    <div v-if="errors">
      <span
        v-for="error of errors"
        :key="error.$uuid"
        class="p-invalid text-red-500"
      >
        {{ error.$message }}
      </span>
    </div>
    <div v-if="externalErrors">
      <span
        v-for="(message, key) of externalErrors"
        :key="key"
        class="p-invalid text-red-500"
      >
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { app } from '@/config'

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default() {
        return this.$t('contact.phone')
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default() {
        return []
      }
    },
    externalErrors: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
      countryCode: '',
      tempValue: ''
    }
  },

  computed: {
    ...mapGetters({
      countries: 'country/getCountries'
    }),
    phoneNumber() {
      return this.extractPhoneNumber(this.value)
    }
  },

  watch: {
    value: {
      handler(value) {
        this.tempValue = this.extractPhoneNumber(value)
      }
    }
  },

  mounted() {
    const defaultCountry = this.countries.find(
      (i) => i.id === app.default_country
    )

    this.countryCode = defaultCountry ? defaultCountry.code : '855'
    this.tempValue = this.phoneNumber
  },

  methods: {
    extractPhoneNumber(value) {
      if (!value) {
        return ''
      }

      const number = value.replace('+' + this.countryCode, '')
      if (!number) {
        return ''
      }

      return Number(number)
    },
    handleInputPhone(event) {
      if (!event || !String(event)) {
        return this.$emit('input', null)
      }

      const number = String(event).replace(/[^0-9]/g, '')
      const hasString = /[^0-9]+$/.test(event)
      if (hasString) {
        this.tempValue = number
        return this.$emit('input', number)
      }

      if (number.length >= 10) {
        this.tempValue = this.phoneNumber
        return this.$emit('input', this.value)
      }

      this.$emit('input', '+' + String(this.countryCode) + number)
    }
  }
}
</script>
