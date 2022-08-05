<template>
  <panel :header="$t('property.title.publishing')" :toggleable="true">
    <div v-if="published" class="grid-container">
      <form-field-datepicker
        v-show="selectedFormLayout === formLayout.DETAIL"
        v-model="listingDate"
        :disabled="true"
        :label="$t('property.model.listing_date')"
        :errors="v$.listingDate && v$.listingDate.$errors"
      />
      <form-field-datepicker
        v-show="selectedFormLayout === formLayout.DETAIL"
        v-model="expireListingDate"
        :disabled="true"
        :label="$t('property.model.expired_listing_date')"
        :errors="v$.expireListingDate && v$.expireListingDate.$errors"
      />
      <!-- <form-field-input-switch
        v-model="published"
        :label="$t('property.model.publishing.active')"
        :errors="v$.published && v$.published.$errors"
      /> -->
      <form-field-input-switch
        v-model="exclusive"
        :label="$t('property.model.publishing.exclusive')"
        :errors="v$.exclusive && v$.exclusive.$errors"
      />
      <form-field-input-switch
        v-show="selectedFormLayout === formLayout.DETAIL"
        v-model="publishedOnWebsite"
        :disable="true"
        :label="$t('property.model.publishing.published_on_website')"
        :errors="v$.publishedOnWebsite && v$.publishedOnWebsite.$errors"
      />
      <form-field-input-switch
        v-show="selectedFormLayout === formLayout.DETAIL"
        v-model="featured"
        :disable="true"
        :label="$t('property.model.publishing.featured')"
        :errors="v$.featured && v$.featured.$errors"
      />
      <form-field-input-switch
        v-show="selectedFormLayout === formLayout.DETAIL"
        v-model="show_map"
        :label="$t('property.model.publishing.show_map')"
        :errors="v$.show_map && v$.show_map.$errors"
      />
    </div>
    <form-field-textarea
      v-show="selectedFormLayout === formLayout.DETAIL"
      v-model="description"
      :label="$t('common.note')"
      :row="3"
      :errors="v$.description && v$.description.$errors"
      placeholder="..."
    />
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { createHelpers } from 'vuex-map-fields'
import { FormLayout } from '@/enums/FormLayout'

const { mapFields } = createHelpers({
  getterType: 'property/getField',
  mutationType: 'property/updateField'
})

export default {
  setup: () => ({ v$: useVuelidate() }),

  validations() {
    return {
      published: { required },
      publishedOnWebsite: { required },
      exclusive: { required },
      featured: { required },
      listingDate: { required },
      expireListingDate: { required }
    }
  },

  data() {
    return {
      formLayout: FormLayout,
      options: [
        { label: this.$t('common.yes'), value: true },
        { label: this.$t('common.no'), value: false }
      ]
    }
  },
  computed: {
    ...mapFields({
      selectedFormLayout: 'form.other.form_layout',
      description: 'form.publishing.description',
      published: 'form.publishing.published',
      publishedOnWebsite: 'form.publishing.published_on_website',
      exclusive: 'form.publishing.exclusive',
      featured: 'form.publishing.featured',
      show_map: 'form.publishing.show_map',
      listingDate: 'form.listing_date',
      expireListingDate: 'form.expired_listing_date'
    })
  },

  mounted() {
    if (this.listingDate) {
      this.listingDate = new Date(this.listingDate)
    }
    if (this.expireListingDate) {
      this.expireListingDate = new Date(this.expireListingDate)
    }
  }
}
</script>

<style lang="postcss" scoped>
.grid-container {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-4 xl:gap-5 mt-px mb-4;
}
</style>
