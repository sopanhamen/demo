<template>
  <div class="bg-white rounded-md shadow">
    <!-- Header -->
    <div class="flex flex-wrap bg-primary rounded-t-md p-4 pr-0">
      <div class="flex pr-5">
        <nuxt-link
          v-if="hasProfile"
          :to="localePath('/agent-detail/' + item.id)"
        >
          <nuxt-img
            :src="profileImage"
            alt="Agent profile"
            class="h-20 w-20 rounded-full"
          />
        </nuxt-link>
      </div>
      <div>
        <nuxt-link
          v-if="hasProfile"
          :to="localePath('/agent-detail/' + item.id)"
        >
          <div class="font-bold text-white text-lg">
            {{ item.name || no_data }}
          </div>
        </nuxt-link>
        <div class="text-sm text-white">
          <i class="pi pi-phone font-bold text-base pr-2" />
          <span v-if="primaryPhone && item.mobile">
            {{ primaryPhone }} | {{ item.mobile }}
          </span>
          <span v-else>{{ primaryPhone || item.mobile || no_data }}</span>
        </div>
        <div class="text-sm text-white">
          <i class="pi pi-envelope font-bold text-base pr-2" />
          {{ item.email || no_data }}
        </div>
      </div>
    </div>
    <div class="text-center justify-center mt-2 text-xl font-bold">
      {{ $t('common.contact_me') }}
    </div>
    <pv-message v-if="sent" severity="success" :closable="false">
      <div class="p-4">
        {{ $t('message.received_inquiry') }}
      </div>
    </pv-message>
    <form v-show="!sent" class="px-4" @submit.prevent="confirmSendMail">
      <div class="my-4">
        <form-field-input
          v-model="customerEmail"
          :label="$t('common.email')"
          :placeholder="$t('common.your_email')"
          :errors="v$.customerEmail && v$.customerEmail.$errors"
        />
      </div>
      <div class="my-4">
        <form-field-input
          v-model="customerPhoneNumber"
          :label="$t('common.phone')"
          :placeholder="$t('common.your_phone')"
          :errors="v$.customerPhoneNumber && v$.customerPhoneNumber.$errors"
        />
      </div>
      <div class="my-4">
        <form-field-textarea
          v-model="message"
          :label="$t('common.message')"
          :errors="v$.message && v$.message.$errors"
          class="block form-textarea w-full border-gray-200 bg-gray-50 rounded-md focus:ring-blue-400"
        />
      </div>
      <vue-recaptcha
        ref="recaptcha"
        :sitekey="recaptcha.siteKey"
        :size="recaptcha.size"
        :badge="recaptcha.badge"
        @verify="onVerifyRecaptcha"
      />
      <pv-message
        v-if="error"
        severity="error"
        :inline="true"
        :closable="false"
      >
        {{ $t('message.error_send_mail') }}
      </pv-message>
      <div class="flex items-center justify-between my-4">
        <button
          v-if="!sent"
          :disabled="submitting"
          class="bg-primary hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded w-full focus:outline-none focus:shadow-outline focus:bg-yellow-700 mb-4"
          type="button"
          @click="confirmSendMail"
        >
          {{ $t('common.send_message') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
  props: {
    property: {
      type: Object,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },

  setup() {
    const customerEmail = ref('')
    const customerPhoneNumber = ref('')
    const message = ref('')
    const messageMinLength = 12

    const rules = computed(() => ({
      customerEmail: { required, email },
      customerPhoneNumber: { required, minLength: minLength(8) },
      message: { required, minLength: minLength(messageMinLength) }
    }))

    return {
      customerEmail,
      message,
      messageMinLength,
      customerPhoneNumber,
      v$: useVuelidate(rules, { customerEmail, customerPhoneNumber, message })
    }
  },

  data() {
    return {
      sent: false,
      error: false,
      submitting: false,
      no_data: 'N/A',
      recaptcha: this.$config.recaptcha
    }
  },

  computed: {
    primaryPhone() {
      return this.item.profile?.contact?.primary_phone
    },
    profileImage() {
      return (
        this.item.profile?.profile_picture?.url ||
        this.$config.image.default.noPhoto
      )
    },
    hasProfile() {
      return !!(this.item && this.item.profile)
    }
  },

  methods: {
    async onVerifyRecaptcha(token) {
      try {
        this.submitting = true
        const sent = await this.$service.siteInquiry.create({
          token,
          url: window ? window.location.href : this.$route.fullPath,
          property_id: this.property.id,
          email: this.customerEmail,
          phone_number: this.customerPhoneNumber,
          message: this.message
        })

        if (sent) {
          this.sent = true
          this.submitting = false
        }
      } catch (error) {
        this.error = true
        this.submitting = false
      }
    },
    confirmSendMail() {
      try {
        this.submitting = true
        const result = this.v$.$validate()
        if (!result) {
          return
        }

        this.$refs.recaptcha.execute('contact')
      } catch (error) {
        this.error = true
        this.submitting = false
      }
    }
  }
}
</script>
