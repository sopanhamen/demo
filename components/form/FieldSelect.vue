<template>
  <div class="text-sm">
    <label v-if="label" class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <multi-select
      v-if="multiple"
      v-model="model"
      :options="options"
      :placeholder="placeholder"
      :show-toggle-all="false"
      :filter="filter"
      :option-label="optionLabel"
      :option-value="optionValue"
      :show-clear="showClear"
      :class="inputClass"
      :disabled="disabled"
      class="w-full p-inputtext-sm py-0 items-center text-sm"
      @change="$emit('change', $event)"
      @beforeShow="$emit('beforeShow', $event)"
      @beforeHide="$emit('beforeHide', $event)"
      @hide="$emit('hide', $event)"
      @show="$emit('show', $event)"
      @filter="$emit('filter', $event)"
    />
    <dropdown
      v-else
      v-model="model"
      :options="options"
      :filter="filter"
      :placeholder="placeholder"
      :option-label="optionLabel"
      :option-value="optionValue"
      :show-clear="showClear"
      :class="inputClass"
      :disabled="disabled"
      class="w-full p-inputtext-sm py-0 items-center text-sm"
      @change="$emit('change', $event)"
      @beforeShow="$emit('beforeShow', $event)"
      @beforeHide="$emit('beforeHide', $event)"
      @hide="$emit('hide', $event)"
      @show="$emit('show', $event)"
      @filter="$emit('filter', $event)"
    />
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
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [Array, Object, String, Number, Boolean],
      required: false,
      default: null
    },
    options: {
      type: [Object, Array],
      required: true
    },
    required: {
      type: Boolean,
      default() {
        return false
      }
    },
    errors: {
      type: Array,
      default() {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    optionLabel: {
      type: [String, Function],
      default: null
    },
    optionValue: {
      type: [String, Function],
      default: null
    },
    placeholder: {
      type: String,
      default() {
        return this.$t('common.select')
      }
    },
    showClear: {
      type: Boolean,
      default: true
    },
    inputClass: {
      type: [String, Array, Object],
      default: ''
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
