<template>
  <div class="bg-white shadow" :class="roundSize">
    <!-- Header -->
    <div class="grid sm:grid-cols-12 rounded-t-md p-4 pr-0">
      <div class="pr-5 flex flex-col sm:col-span-4">
        <nuxt-link
          v-if="hasProfile"
          class="relative h-80"
          :to="localePath('/agent-detail/' + item.id)"
        >
          <nuxt-img
            :src="profileImage"
            alt="Agent profile"
            class="h-full w-full object-contain rounded"
          />
        </nuxt-link>

        <div class="space-y-2 mt-10">
          <nuxt-link
            v-if="hasProfile"
            :to="localePath('/agent-detail/' + item.id)"
          >
            <div class="font-bold text-primary text-lg md:text-2xl">
              {{ item.name || no_data }}
            </div>
          </nuxt-link>
          <p class="text-lg">
            {{ item.profile.position || no_data }}
          </p>
          <div class="text-sm flex items-center">
            <div
              class="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full"
            >
              <i class="pi pi-phone font-bold text-lg" />
            </div>
            <a :href="`tel:${primaryPhone}`" class="pl-2">{{
              primaryPhone || no_data
            }}</a>
          </div>
          <div class="text-sm flex items-center">
            <div
              class="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full"
            >
              <i class="fa fa-mobile font-bold text-lg" />
            </div>
            <a :href="`tel:${secondaryPhone}`" class="pl-2">{{
              secondaryPhone || no_data
            }}</a>
          </div>
          <div class="text-sm flex items-center">
            <div
              class="bg-gray-200 w-10 h-10 flex justify-center items-center rounded-full"
            >
              <i class="pi pi-envelope font-bold text-lg" />
            </div>
            <a :href="`mailto:${item.email}`" class="pl-2">{{
              item.email || no_data
            }}</a>
          </div>
        </div>
      </div>
      <div class="text-gray-600 sm:col-span-8 space-y-3">
        <div class="p-4">
          <pv-message v-if="sent" severity="success" :closable="false">
            {{ $t('message.received_inquiry') }}
          </pv-message>
        </div>
        <form v-show="!sent" class="px-4" @submit.prevent="confirmSendMail">
          <div class="flex flex-wrap space-x-4 mb-4">
            <h3 class="text-primary text-xl lg:text-2xl font-bold">
              {{ $t('common.contact_me') }}
            </h3>
            <!-- <button
              type="button"
              class="text-gray-100 bg-primary font-medium px-2 hover:bg-gray-400"
              :class="roundSize"
            >
              {{ $t('common.schedule_a_showing') }}?
            </button> -->
          </div>
          <!-- <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <form-field-input
              :disabled="true"
              :placeholder="$t('common.day')"
              :input-class="roundSize"
            />
            <form-field-input
              :disabled="true"
              :placeholder="$t('common.time')"
              :input-class="roundSize"
            />
          </div> -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <!-- <form-field-input
              :disabled="true"
              :placeholder="$t('common.your_name')"
              :input-class="roundSize"
            /> -->
            <form-field-input
              v-model="customerEmail"
              :placeholder="$t('common.your_email')"
              :input-class="roundSize"
              :errors="v$.customerEmail && v$.customerEmail.$errors"
            />
            <form-field-input
              v-model="customerPhoneNumber"
              :placeholder="$t('common.your_phone')"
              :input-class="roundSize"
              :errors="v$.customerPhoneNumber && v$.customerPhoneNumber.$errors"
            />
          </div>
          <form-field-textarea
            v-model="message"
            :errors="v$.message && v$.message.$errors"
            :input-class="roundSize"
            class="block form-textarea w-full border-gray-200 bg-gray-50 focus:ring-gray-50"
          />
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
          <div
            class="flex flex-wrap items-center text-center text-base my-4 gap-4"
          >
            <div
              class="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-4 w-full"
            >
              <button
                v-if="!sent"
                :disabled="submitting"
                class="col-span-1 font-bold py-3 px-4 w-full text-white bg-primary border border-primary"
                type="button"
                @click="confirmSendMail"
              >
                <div :class="hoverClass">
                  {{ $t('common.send_email') }}
                </div>
              </button>
              <a
                :href="`tel:${primaryPhone}` || '#'"
                class="col-span-2 font-bold py-3 px-4 w-full text-primary border border-primary bg-white"
              >
                <div :class="hoverClass">
                  <i class="pi pi-phone" />
                  <span class="inline lg:block xl:inline">
                    {{ `${$t('common.call')} ${primaryPhone || no_data}` }}
                  </span>
                </div>
              </a>
            </div>
            <div
              class="grid grid-cols-1 md:grid-cols-4 gap-y-4 md:gap-4 w-full"
            >
              <a
                class="col-span-1 font-bold py-3 px-4 w-full text-primary border border-primary bg-white"
                :href="line"
                target="_blank"
                type="button"
              >
                <div :class="hoverClass">
                  <i class="fa-brands fa-line" />
                  <span class="inline lg:hidden xl:inline">
                    {{ $t('common.line') }}
                  </span>
                </div>
              </a>
              <a
                class="col-span-2 font-bold py-3 px-4 w-full text-white bg-primary border border-primary"
                :href="telegram"
                target="_blank"
                type="button"
              >
                <div :class="hoverClass">
                  <i class="pi pi-telegram" />
                  <span class="inline lg:hidden xl:inline">
                    {{ $t('common.telegram') }}
                  </span>
                </div>
              </a>
              <a
                class="col-span-1 font-bold py-3 px-4 w-full text-primary border border-primary bg-white"
                :href="facebook"
                target="_blank"
                type="button"
              >
                <div :class="hoverClass">
                  <i class="pi pi-facebook" />
                  <span class="inline lg:hidden xl:inline">
                    {{ $t('common.facebook') }}
                  </span>
                </div>
              </a>
            </div>
          </div>
          <p class="text-gray-300">
            You can reply to private messages from "Inbox" page in your user
            account
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import useTheme from '@/composables/useTheme'
import useUrl from '@/composables/useUrl'

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
    const { roundSize } = useTheme()
    const customerEmail = ref('')
    const customerPhoneNumber = ref('')
    const message = ref('')
    const messageMinLength = 12

    const rules = computed(() => ({
      customerEmail: { required, email },
      customerPhoneNumber: { required, minLength: minLength(8) },
      message: { required, minLength: minLength(messageMinLength) }
    }))

    const { isUrl } = useUrl()

    return {
      isUrl,
      roundSize,
      customerEmail,
      message,
      messageMinLength,
      customerPhoneNumber,
      v$: useVuelidate(rules, { customerEmail, customerPhoneNumber, message })
    }
  },

  data() {
    return {
      hoverClass: 'transition duration-200 hover:scale-125',
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
    secondaryPhone() {
      return this.item.profile?.contact?.secondary_phone
    },
    facebook() {
      return this.item.profile?.contact?.facebook
    },
    telegram() {
      const telegramDomain = 'https://t.me/'

      if (!this.item.profile?.contact?.telegram) {
        return telegramDomain + this.primaryPhone
      }

      if (this.isUrl(this.item.profile?.contact?.telegram)) {
        return this.item.profile?.contact?.telegram
      }

      return telegramDomain + this.item.profile?.contact?.telegram
    },
    line() {
      return this.item.profile?.contact?.line
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
<style lang="scss" scoped>
::v-deep .button .p-button-icon {
  font-size: 25px !important;
}
::v-deep .button .p-button-icon {
  .button {
    border: 1px solid black;
    border-radius: 3px;
    width: 100px;
    height: 30px;
    display: block;

    background: linear-gradient(to right, black 50%, white 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition: all 0.2s ease-out;
  }

  .button:hover {
    background-position: left bottom;
  }

  .text {
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    color: black;
    transition: all 0.2s ease-out;
    display: block;
  }

  .text:hover {
    color: white;
  }
}
</style>
