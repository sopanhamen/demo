<template>
  <div class="sm:flex justify-end">
    <div class="w-full rounded-t-md items-center mb-3 sm:mb-0 flex space-x-2">
      <span v-if="totalRecords" class="text-xl">
        {{ totalRecords }}
      </span>
      <span> {{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalRecords: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      icon: false
    }
  },
  computed: {
    title() {
      if (!this.totalRecords) return this.$t('message.no_property_found')

      return `${
        this.totalRecords > 1
          ? this.$t('common.properties')
          : this.$t('property.label')
      }`
    }
  }
}
</script>
