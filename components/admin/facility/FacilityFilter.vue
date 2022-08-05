<template>
  <form @submit.prevent="$emit('search', true)">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <form-field-input
        v-model="code"
        :label="$t('facility.model.code')"
        :show-clear="true"
        @input="update()"
      />
      <form-field-input
        v-model="name"
        :label="$t('facility.model.name')"
        :show-clear="true"
        @input="update()"
      />
    </div>
    <div class="mt-3 flex justify-end sm:space-x-3">
      <pv-button
        :label="$t('common.filter')"
        icon="pi pi-filter"
        class="p-button-sm"
        type="submit"
      />
      <pv-button
        :label="$t('common.clear')"
        icon="pi pi-times"
        class="p-button-sm p-button-danger"
        type="button"
        @click="resetSearch"
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      code: null,
      name: null
    }
  },

  methods: {
    update() {
      this.$emit('input', [
        { column: 'code', value: this.code },
        { column: 'name', value: this.name }
      ])
    },

    resetSearch() {
      this.code = null
      this.name = null
      this.$emit('clear')
    }
  }
}
</script>
