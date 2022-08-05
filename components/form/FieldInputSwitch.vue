<template>
  <div class="text-sm">
    <div class="flex flex-row" :class="wrapperClass">
      <input-switch v-model="model" />
      <span class="py-1 pl-4 font-bold">{{ label }}</span>
    </div>
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
      required: true
    },
    value: {
      type: Boolean,
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
    wrapperClass: {
      type: [Array, Object, String],
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
