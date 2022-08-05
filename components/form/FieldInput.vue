<template>
  <div class="text-sm">
    <label v-if="label" :class="labelClass" class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <input-number
      v-if="type === 'number'"
      v-model="model"
      :placeholder="placeholder"
      :show-clear="showCLear"
      :readonly="readonly"
      :disabled="disabled"
      :class="inputClass"
      class="w-full p-inputtext-sm"
      input-class="max-w-full"
      @input="$emit('input', $event)"
      @keypress="$emit('keypress', $event)"
      @blur="$emit('blur', $event)"
    />
    <input-text
      v-else
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :show-clear="showCLear"
      :readonly="readonly"
      :class="inputClass"
      :disabled="disabled"
      class="w-full p-inputtext-sm"
      input-class="max-w-full"
      @input="$emit('input', $event)"
      @keypress="$emit('keypress', $event)"
      @blur="$emit('blur', $event)"
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
    <div v-if="externalErrors">
      <span
        v-for="(message, key) of externalErrors"
        :key="key"
        class="p-invalid text-red-500"
      >
        {{ message }}
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
      type: [String, Number],
      required: false,
      default: null
    },
    required: {
      type: Boolean,
      default() {
        return false
      }
    },
    showCLear: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default() {
        return []
      }
    },
    externalErrors: {
      type: Array,
      default: () => {
        return []
      }
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: [String, Number],
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    inputClass: {
      type: [String, Array, Object],
      default: ''
    },
    labelClass: {
      type: [String, Array, Object],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
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
