<template>
  <div class="grid lg:grid-cols-2 grid-cols-1 gap-4 pb-5">
    <panel :header="$t('common.general_information')">
      <form-field-input
        v-model="name"
        :label="$t('company.branch.model.name')"
        :errors="v$.name && v$.name.$errors"
        :required="true"
      />
      <admin-form-contact
        v-model="contact"
        :validation="contactValidation"
        class="my-4"
      />
      <admin-form-location
        v-model="location"
        :validation="locationValidation"
        class="my-4"
      />
      <form-field-select-button
        v-model="published"
        :label="$t('common.published')"
        :options="[
          { label: $t('common.publish'), value: true },
          { label: $t('common.un_publish'), value: false }
        ]"
        :errors="v$.published && v$.published.$errors"
        option-label="label"
        option-value="value"
        required
      />
    </panel>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { mapMutations } from 'vuex'
const { mapFields } = createHelpers({
  getterType: 'companyBranch/getField',
  mutationType: 'companyBranch/updateField'
})

export default {
  name: 'CompanyBranchForm',

  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      name: { required, minLength: minLength(1) },
      published: { required }
    }
  },

  data() {
    return {
      contactValidation: {
        email: { required, email },
        primary_phone: { required, minLength: minLength(9) },
        secondary_phone: { minLength: minLength(9) }
      },
      locationValidation: {
        country_id: { required }
      }
    }
  },

  computed: {
    ...mapFields({
      company: 'form.company_id',
      name: 'form.name',
      primary_phone: 'form.primary_phone',
      secondary_phone: 'form.secondary_phone',
      email: 'form.email',
      website: 'form.website',
      country_id: 'form.country_id',
      province_id: 'form.province_id',
      district_id: 'form.district_id',
      commune_id: 'form.commune_id',
      street: 'form.street',
      lat_lng: 'form.lat_lng',
      published: 'form.published'
    }),
    contact: {
      get() {
        return {
          primary_phone: this.primary_phone,
          secondary_phone: this.secondary_phone,
          email: this.email,
          website: this.website
        }
      },
      set(contact) {
        this.setFormData(contact)
      }
    },
    location: {
      get() {
        return {
          country_id: this.country_id,
          province_id: this.province_id,
          district_id: this.district_id,
          commune_id: this.commune_id,
          street: this.street,
          lat_lng: this.lat_lng
        }
      },
      set(location) {
        this.setFormData(location)
      }
    }
  },

  mounted() {
    this.company = this.$auth.user.profile.company_id
  },

  methods: {
    ...mapMutations({
      setFormData: 'companyBranch/SET_COMPANY_BRANCH_FORM'
    })
  }
}
</script>
