<template>
  <div class="gap-x-5 gap-y-4" :class="containerClass">
    <form-field-select
      v-model="model.listingStatus"
      :options="statuses"
      :label="$t('listing_status.label')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-field-select
      v-model="model.approvedBy"
      :options="[
        { label: $t('common.approval'), value: true },
        { label: $t('common.not_approval'), value: false }
      ]"
      :label="$t('common.approval')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-field-select
      v-model="model.publishedOnWebsite"
      :options="[
        {
          label: $t('common.published_on_website'),
          value: true
        },
        { label: $t('common.un_published_on_website'), value: false }
      ]"
      :label="$t('common.published_on_website')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-field-select
      v-model="model.showMap"
      :options="[
        { label: $t('common.show_map'), value: true },
        { label: $t('common.not_show_map'), value: false }
      ]"
      :label="$t('common.show_map')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
    <form-field-select
      v-model="model.featured"
      :options="[
        { label: $t('common.featured'), value: true },
        { label: $t('common.not_featured'), value: false }
      ]"
      :label="$t('common.featured')"
      :placeholder="$t('common.select') + '...'"
      option-label="label"
      option-value="value"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    containerClass: {
      type: [String, Array, Object],
      default() {
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }
    }
  },
  computed: {
    ...mapGetters({
      listingStatuses: 'resource/getListingStatuses'
    }),
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    statuses() {
      return this.listingStatuses.map((status) => ({
        value: status.value,
        label: this.$t('listing_status.model.' + status.label)
      }))
    }
  }
}
</script>
