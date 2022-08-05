<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 gap-x-3 md:gap-x-12 items-center lg:p-0 sm:p-4 p-4"
  >
    <pv-message v-if="sent" severity="success" :closable="false">
      <div class="p-4">
        {{ $t('message.received_inquiry') }}
      </div>
    </pv-message>
    <form
      v-show="!sent"
      class="space-y-5 my-10"
      @submit.prevent="confirmSendMail"
    >
      <div class="grid gap-5 grid-cols-1 xl:grid-cols-2">
        <form-field-input
          v-model="customerName"
          label-class=" font-bold text-primary"
          :input-class="roundSize"
          :label="$t('common.your_name')"
          :errors="v$.customerName && v$.customerName.$errors"
        />
        <form-field-input
          v-model="customerEmail"
          label-class=" font-bold text-primary"
          :input-class="roundSize"
          :label="$t('common.your_email')"
          :errors="v$.customerEmail && v$.customerEmail.$errors"
        />
        <form-field-input
          v-model="customerPhoneNumber"
          label-class=" font-bold text-primary"
          :input-class="roundSize"
          :label="$t('common.your_phone')"
          :errors="v$.customerPhoneNumber && v$.customerPhoneNumber.$errors"
        />
        <form-field-input
          v-model="subject"
          label-class=" font-bold text-primary"
          :input-class="roundSize"
          :label="$t('contact.subject')"
          :errors="v$.subject && v$.subject.$errors"
        />
      </div>
      <div>
        <form-field-textarea
          v-model="message"
          label-class=" font-bold text-primary"
          :errors="v$.message && v$.message.$errors"
          :label="$t('common.message')"
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
        :class="roundSize"
        :disabled="submitting"
        class="bg-primary text-white py-3 px-6 rounded w-full sm:w-fit"
        type="button"
        @click="confirmSendMail"
      >
        {{ $t('contact.submit_request') }}
      </button>
      <button
        v-if="!sent && submitting"
        :class="roundSize"
        class="bg-primary text-white py-3 px-16 rounded w-full sm:w-fit"
        type="button"
      >
        <i class="pi pi-spin pi-spinner"></i>
      </button>
    </form>
    <div class="my-10">
      <div
        class="grid lg:justify-items-start md:justify-items-start justify-items-center"
      >
        <p class="text-2xl font-bold text-gray-700">
          {{ $t('contact.get_in_touch') }}
        </p>
        <p class="text-gray-600 text-sm pt-2">
          {{ props.description }}
        </p>
      </div>
      <div class="space-y-10 mt-10">
        <div class="flex justify-start sm:justify-end">
          <i class="fa fa-home text-5xl text-primary" />
          <div class="ml-3">
            <p class="font-bold text-base text-gray-600">
              {{ $t('contact.reach_us') }}
            </p>
            <p class="text-gray-600 text-sm max-w-xs">
              {{ $t('contact.location') }}
            </p>
          </div>
        </div>
        <div class="flex justify-start sm:justify-end">
          <i class="fa fa-envelope text-5xl text-primary" />
          <div class="ml-3">
            <p class="font-bold text-base text-gray-600">
              {{ $t('contact.email') }}
            </p>
            <p class="text-gray-600 text-sm max-w-xs">
              {{ props.email1 }}
            </p>
            <p v-if="props.email2" class="text-gray-600 text-sm max-w-xs">
              {{ props.email2 }}
            </p>
          </div>
        </div>
        <div class="flex justify-start sm:justify-end">
          <i class="fa fa-mobile text-5xl text-primary" />
          <div class="ml-3">
            <p class="font-bold text-base text-gray-600 max-w-xs">
              {{ $t('contact.call') }}
            </p>
            <p v-if="props.phone1" class="text-gray-600 text-sm max-w-xs">
              {{ props.phone1 }}
            </p>
            <p v-if="props.phone2" class="text-gray-600 text-sm max-w-xs">
              {{ props.phone2 }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, defineComponent } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import useTheme from '@/composables/useTheme'

export default defineComponent({
  name: 'DefaultContact',

  props: {
    props: {
      type: Object,
      default() {
        return {
          description:
            'Company a Real Estate company. We focus on a standard residential building in Phnom Penh.',
          email1: '',
          email2: '',
          phone1: '',
          phone2: ''
        }
      }
    }
  },

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
      recaptcha: this.$config.recaptcha
    }
  },

  methods: {
    async onVerifyRecaptcha(token) {
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
})
</script>
