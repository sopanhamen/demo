<template>
  <div>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
      <panel :header="$t('common.general_information')" :toggleable="true">
        <div class="grid grid-cols-1 space-y-4">
          <form-field-input
            v-model="name"
            :label="$t('common.name')"
            :errors="v$.name && v$.name.$errors"
            required
          />
          <div class="grid lg:grid-cols-4 grid-cols-4 gap-x-4">
            <form-field-select
              v-model="developmentTypeId"
              :options="developmentTypes"
              :label="$t('developer.model.development_type')"
              :placeholder="$t('common.select')"
              :errors="v$.developmentTypeId && v$.developmentTypeId.$errors"
              class="col-span-3"
              option-value="id"
              option-label="name"
              required
            />

            <client-only>
              <nuxt-link
                :to="
                  localePath(
                    '/admin/development-types/create?ref=' + $route.path
                  )
                "
              >
                <pv-button
                  icon="pi pi-plus"
                  :label="$t('common.new')"
                  class="p-button-sm p-button-primary mt-6"
                />
              </nuxt-link>
            </client-only>
          </div>
          <div class="space-y-3">
            <p>{{ $t('common.published') }}</p>
            <div class="p-field-radiobutton">
              <radio-button
                id="radPublish"
                v-model="published"
                input-id="published-radio"
                name="publish"
                :value="true"
              />
              <label for="radPublish">{{ $t('common.publish') }}</label>
            </div>
            <div class="p-field-radiobutton">
              <radio-button
                id="radUnpublish"
                v-model="published"
                input-id="published-radio"
                name="publish"
                :value="false"
              />
              <label for="radUnpublish">{{ $t('common.un_publish') }}</label>
            </div>
            <div v-if="v$.published">
              <small
                v-for="error of v$.published.$errors"
                :key="error.$uuid"
                class="p-invalid text-red-500"
              >
                {{ error.$message }}
              </small>
            </div>
          </div>
        </div>
      </panel>
      <admin-card-form-contact
        v-model="contact"
        :validation="contactValidations"
      />
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, url } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
// import { mapActions, mapGetters } from 'vuex'

const { mapFields } = createHelpers({
  getterType: 'developer/getField',
  mutationType: 'developer/updateField'
})
export default {
  name: 'EditDeveloper',
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      name: { required, minLength: minLength(2) },
      developmentTypeId: { required },
      published: { required }
    }
  },
  data() {
    return {
      developmentTypes: [],
      contactValidations: {
        primary_phone: { required, minLength: minLength(9) },
        secondary_phone: { minLength: minLength(9) },
        email: { email },
        website: { url },
        facebook: { url }
      }
    }
  },

  computed: {
    ...mapFields({
      name: 'form.name',
      developmentTypeId: 'form.development_type_id',
      primaryPhone: 'form.primary_phone',
      secondaryPhone: 'form.secondary_phone',
      email: 'form.email',
      website: 'form.website',
      facebook: 'form.facebook',
      published: 'form.published',
      address: 'form.address'
    }),
    contact: {
      get() {
        return {
          primary_phone: this.primaryPhone,
          secondary_phone: this.secondaryPhone,
          email: this.email,
          website: this.website,
          facebook: this.facebook,
          published: this.published,
          address: this.address
        }
      },
      set(value) {
        this.primaryPhone = value.primary_phone
        this.secondaryPhone = value.secondary_phone
        this.email = value.email
        this.website = value.website
        this.facebook = value.facebook
        this.published = value.published
        this.address = value.address
      }
    }
  },

  // Fetching developments
  async mounted() {
    await this.$store.dispatch('developmentType/fetchAllDevelopmentTypes')
    this.developmentTypes = await this.$store.getters[
      'developmentType/getPublishedDevelopmentTypes'
    ]
  }
}
</script>
