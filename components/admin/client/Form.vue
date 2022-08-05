<template>
  <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
    <div class="flex-wrap space-y-4">
      <panel :header="$t('client.form.general')" :toggleable="true">
        <div class="grid gap-y-4 xl:gap-y-5">
          <admin-client-form-general-information />
          <admin-form-contact
            v-model="contact"
            :validation="contactValidation"
            :external-errors="externalErrors"
          />
        </div>
      </panel>
      <panel :header="$t('client.form.location')" :toggleable="true">
        <admin-form-location
          v-model="address"
          :validation="addressValidation"
          @input="$emit('input', $event)"
        />
      </panel>
    </div>

    <admin-client-form-requirement v-if="requirement" />
    <!-- <admin-card-form-photo /> -->
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'client/getField',
  mutationType: 'client/updateField'
})

export default defineComponent({
  name: 'ClientForm',
  props: {
    requirement: {
      type: Boolean,
      default: false
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
      img: [],
      imageData: [],
      contactValidation: {
        name: { required, minLength: minLength(2) },
        primary_phone: { required, minLength: minLength(9) },
        secondary_phone: { minLength: minLength(9) },
        email: { email },
        national_id_number: { minLength: minLength(8) },
        passport_number: { minLength: minLength(8) }
      },
      addressValidation: {
        country_id: { required }
      }
    }
  },

  computed: {
    ...mapFields({
      name: 'form.contact.name',
      primary_phone: 'form.contact.primary_phone',
      secondary_phone: 'form.contact.secondary_phone',
      email: 'form.contact.email',
      country_id: 'form.contact.country_id',
      province_id: 'form.contact.province_id',
      district_id: 'form.contact.district_id',
      commune_id: 'form.contact.commune_id',
      gender: 'form.contact.gender',
      national_id_number: 'form.contact.national_id_number',
      passport_number: 'form.contact.passport_number',
      telegram: 'form.contact.telegram',
      line: 'form.contact.line',
      wechat: 'form.contact.wechat'
    }),
    contact: {
      get() {
        return {
          name: this.name,
          primary_phone: this.primary_phone,
          secondary_phone: this.secondary_phone,
          email: this.email,
          gender: this.gender,
          national_id_number: this.national_id_number,
          passport_number: this.passport_number,
          telegram: this.telegram,
          line: this.line,
          wechat: this.wechat
        }
      },
      set(value) {
        this.$store.commit('client/SET_CLIENT_FORM', {
          contact: { ...this.$store.state.client.form.contact, ...value }
        })
      }
    },
    address: {
      get() {
        return {
          country_id: this.country_id,
          province_id: this.province_id,
          district_id: this.district_id,
          commune_id: this.commune_id
        }
      },
      set(value) {
        this.$store.commit('client/SET_CLIENT_FORM', {
          contact: {
            ...this.$store.state.client.form.contact,
            ...value
          }
        })
      }
    }
  }
})
</script>
