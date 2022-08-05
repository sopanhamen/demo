<template>
  <div class="w-full py-4">
    <h2 class="text-xl sm:text-2xl font-bold text-primary mb-4">
      {{ $t('contact.title') }}
    </h2>
    <pv-message v-if="sent" severity="success" :closable="false">
      <div class="p-4">
        {{ $t('message.received_inquiry') }}
      </div>
    </pv-message>
    <form v-show="!sent" class="px-4" @submit.prevent="confirmSendMail">
      <div class="space-y-5">
        <div class="grid gap-5 grid-cols-1 sm:grid-cols-3">
          <form-field-input
            v-model="customerName"
            :input-class="roundSize"
            :placeholder="$t('common.your_name')"
            :errors="v$.customerName && v$.customerName.$errors"
          />
          <form-field-input
            v-model="customerEmail"
            :input-class="roundSize"
            :placeholder="$t('common.your_email')"
            :errors="v$.customerEmail && v$.customerEmail.$errors"
          />
          <form-field-input
            v-model="customerPhoneNumber"
            :input-class="roundSize"
            :placeholder="$t('common.your_phone')"
            :errors="v$.customerPhoneNumber && v$.customerPhoneNumber.$errors"
          />
        </div>
        <div>
          <form-field-input
            v-model="subject"
            :input-class="roundSize"
            :placeholder="$t('contact.subject')"
            :errors="v$.subject && v$.subject.$errors"
          />
        </div>
        <div>
          <form-field-textarea
            v-model="message"
            :errors="v$.message && v$.message.$errors"
            label=" "
            :row="10"
          />
        </div>
        <vue-recaptcha
          ref="recaptcha"
          :sitekey="recaptcha.siteKey"
          :size="recaptcha.size"
          :badge="recaptcha.badge"
          @verify="verifyingRecaptcha"
        />
        <pv-message
          v-if="error"
          severity="error"
          :inline="true"
          :closable="false"
        >
          {{ $t('message.error_send_mail') }}
        </pv-message>
        <button
          v-if="!sent && !submitting"
          :disabled="submitting"
          :class="roundSize"
          class="bg-primary text-white py-3 px-6 rounded w-full sm:w-fit"
          type="button"
          @click="confirmSendMail"
        >
          {{ $t('common.send_message') }}
        </button>
        <button
          v-if="!sent && submitting"
          :class="roundSize"
          class="bg-primary text-white py-3 px-16 rounded w-full sm:w-fit"
          type="button"
        >
          <i class="pi pi-spin pi-spinner"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import useTheme from '@/composables/useTheme'

export default {
  setup() {
    const { roundSize } = useTheme()
    const customerName = ref('')
    const customerEmail = ref('')
    const subject = ref('')
    const customerPhoneNumber = ref('')
    const message = ref('')
    const messageMinLength = 12

    const rules = computed(() => ({
      customerEmail: { required, email },
      customerName: { required },
      subject: { required },
      customerPhoneNumber: { required, minLength: minLength(8) },
      message: { required, minLength: minLength(messageMinLength) }
    }))

    return {
      roundSize,
      customerName,
      subject,
      customerEmail,
      message,
      messageMinLength,
      customerPhoneNumber,
      v$: useVuelidate(rules, {
        customerName,
        subject,
        customerEmail,
        customerPhoneNumber,
        message
      })
    }
  },

  data() {
    return {
      sent: false,
      error: false,
      submitting: false,
      onVerifying: false,
      recaptcha: this.$config.recaptcha
    }
  },

  methods: {
    async onVerifyRecaptcha(token) {
      this.onVerifying = true
      try {
        this.submitting = true
        const sent = await this.$service.contactCompany.create({
          token,
          url: window ? window.location.href : this.$route.fullPath,
          name: this.customerName,
          email: this.customerEmail,
          subject: this.subject,
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
        this.onVerifying = false
      }
    },

    async confirmSendMail() {
      try {
        const result = await this.v$.$validate()

        if (!result) {
          this.error = true
          return
        }

        this.submitting = true
        this.error = false

        await this.verifyingRecaptcha()

        this.$refs.recaptcha.execute('contact')
      } catch (error) {
        this.error = true
        this.submitting = false
      }
    },

    async verifyingRecaptcha() {
      if (!this.onVerifying) {
        await this.onVerifyRecaptcha()
        this.onVerifying = true
      }
    }
  }
}
</script>
