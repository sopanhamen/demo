<template>
  <form @submit.prevent="handleSearch">
    <panel :header="$t('common.search')" :toggleable="true">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4"
      >
        <form-field-input
          v-model="model.property_code"
          :label="$t('common.property_code')"
          :placeholder="codePrefix + '00001'"
        />
        <form-field-input
          v-model="model.email"
          :label="$t('contact.email')"
          :placeholder="$t('contact.email')"
        />
        <form-field-input
          v-model="model.phone_number"
          :label="$t('contact.phone')"
          :placeholder="$t('contact.phone')"
        />
        <form-field-input
          v-model="model.message"
          :label="$t('contact.message')"
          :placeholder="$t('contact.message')"
        />
      </div>
      <div class="mt-3 flex justify-end sm:space-x-3">
        <pv-button
          :label="$t('common.search')"
          icon="pi pi-search"
          class="p-button-sm"
          type="submit"
        />
        <pv-button
          :label="$t('common.clear')"
          icon="pi pi-replay"
          class="p-button-sm p-button-danger"
          type="button"
          @click="resetSearch"
        />
      </div>
    </panel>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FilterSiteInquiry',
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      codePrefix: 'CODE-'
    }
  },

  computed: {
    ...mapGetters({
      getCompanyId: 'company/getCompanyById'
    }),
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },

  mounted() {
    this.company_id = this.$auth.user.profile.company_id
    this.codePrefix = this.getCompanyId(this.company_id).property_code_prefix
  },

  methods: {
    resetSearch() {
      this.model.property_code = null
      this.model.message = null
      this.model.phone_number = null
      this.model.email = null
      this.$emit('onReset', true)
    },
    handleSearch() {
      const filteredValues = [
        { column: 'property_code', value: this.model.property_code },
        { column: 'message', value: this.model.message },
        { column: 'phone_number', value: this.model.phone_number },
        { column: 'email', value: this.model.email }
      ]

      this.$emit('onSearch', filteredValues)
    }
  }
}
</script>
