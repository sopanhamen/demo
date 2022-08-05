<template>
  <panel :header="$t('common.filter')" :toggleable="true">
    <form @submit.prevent="handleSearch">
      <div
        class="grid grid-cols-1 gap-x-5 gap-y-3 w-full"
        :class="{
          'xl:grid-cols-4 md:grid-cols-2': value.length >= 4,
          'xl:grid-cols-3 md:grid-cols-2': value.length == 3,
          'xl:grid-cols-2 md:grid-cols-2': value.length == 2
        }"
      >
        <div v-for="(data, key) in value" :key="key">
          <form-field-input
            v-if="data.type == 'normal'"
            v-model="data.value"
            :label="$t(data.title)"
            :placeholder="$t(data.placeholder)"
          />
          <form-field-select
            v-if="data.type == 'select'"
            v-model="data.value"
            :label="$t(data.title)"
            :option-label="data.optionLabel"
            :option-value="data.optionValue"
            :options="data.option"
            :placeholder="$t(data.placeholder)"
          />
          <form-field-datepicker
            v-if="data.type == 'date'"
            v-model="data.value"
            :label="$t(data.title)"
          />
          <form-input-twin
            v-if="data.type == 'twin'"
            v-model="data.value"
            :label-first="$t(data.titleFirst)"
            :label-second="$t(data.titleSecond)"
            type="number"
          />
        </div>
      </div>
      <div class="mt-3 flex justify-end sm:space-x-3">
        <pv-button
          :label="$t('common.search')"
          type="submit"
          class="p-button-sm"
          icon="pi pi-search"
        />
        <pv-button
          :label="$t('common.clear')"
          class="p-button-sm p-button-danger"
          icon="pi pi-replay"
          type="button"
          @click="resetSearch"
        />
      </div>
    </form>
  </panel>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },

  methods: {
    resetSearch() {
      const filters = this.value.map((filter) => ({ ...filter, value: null }))
      this.$emit('input', filters)
      this.$emit('onReset')
    },

    handleSearch() {
      this.$emit('onSearch', this.value)
    }
  }
}
</script>
