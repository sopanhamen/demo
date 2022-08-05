<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
    <admin-user-form-general />
    <div class="space-y-4">
      <admin-user-form-team />
      <panel :header="$t('contact.label')" :toggleable="true">
        <div class="space-y-4">
          <admin-form-contact
            v-model="contact"
            :readonly-fields="['name', 'email', 'primary_phone']"
          />
        </div>
      </panel>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { mapMutations } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'user/getField',
  mutationType: 'user/updateField'
})

export default {
  name: 'AdminUserForm',
  setup: () => ({ v$: useVuelidate() }),

  computed: {
    ...mapFields({
      contactName: 'form.profile.contact.name',
      contactPrimaryPhone: 'form.profile.contact.primary_phone',
      contactSecondaryPhone: 'form.profile.contact.secondary_phone',
      contactEmail: 'form.profile.contact.email',
      contactFacebook: 'form.profile.contact.facebook',
      contactTelegram: 'form.profile.contact.telegram',
      contactLine: 'form.profile.contact.line',
      image: 'form.profile.profile_picture',
      profile: 'form.profile'
    }),
    contact: {
      get() {
        return {
          name: this.contactName,
          primary_phone: this.contactPrimaryPhone,
          secondary_phone: this.contactSecondaryPhone,
          email: this.contactEmail,
          facebook: this.contactFacebook,
          telegram: this.contactTelegram,
          line: this.contactLine
        }
      },
      set(value) {
        this.updateForm({
          profile: {
            ...this.profile,
            contact: value
          }
        })
      }
    }
  },

  methods: {
    ...mapMutations({
      updateForm: 'user/UPDATE_USER_FORM'
    }),

    setImage(event) {
      this.$store.commit('property/SET_USER_FORM', {
        image: event
      })
    }
  }
}
</script>
