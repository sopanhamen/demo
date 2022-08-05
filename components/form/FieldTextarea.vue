<template>
  <div class="text-sm">
    <label class="mb-1 font-bold" :class="labelClass">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <pv-textarea
      v-model="model"
      :placeholder="placeholder"
      :rows="row"
      :class="inputClass"
      class="w-full border-gray-200"
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
    errors: {
      type: Array,
      default() {
        return []
      }
    },
    row: {
      type: Number,
      default: 5
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputClass: {
      type: [String, Array, Object],
      default: 'rounded-md'
    },
    labelClass: {
      type: [String, Array, Object],
      default: 'rounded-md'
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
