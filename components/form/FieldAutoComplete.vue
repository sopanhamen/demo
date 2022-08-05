<template>
  <div class="text-sm">
    <label class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <auto-complete
      :value="value"
      :label="label"
      :suggestions="suggestions"
      :field="searchField"
      :readonly="readonly"
      :option-value="optionValue"
      :force-selection="forceSelection"
      @input="$emit('input', $event)"
      @complete="$emit('complete', $event)"
      @item-select="$emit('completed', $event)"
      @item-unselect="$emit('completed', $event)"
      @dropdown-click="$emit('completed', $event)"
      @clear="$emit('clear', $event)"
    >
      <template #item="{ item }">
        <div>{{ item[searchField] }}</div>
      </template>
    </auto-complete>
    <div v-if="errors">
      <span
        v-for="error of errors"
        :key="error.$uuid"
        class="p-invalid text-red-500"
      >
        {{ error.$message }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String, Object],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    forceSelection: {
      type: Boolean,
      default: false
    },
    searchField: {
      type: String,
      default: 'name'
    },
    suggestions: {
      type: Array,
      default() {
        return []
      }
    },
    optionValue: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-autocomplete {
  width: 100%;
  .p-inputtext {
    padding: 0.65625rem 0.65625rem !important;
    font-size: 0.875rem !important;
    width: 100%;
  }
}
</style>
