<template>
  <div class="field text-sm">
    <label class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <calendar
      id="icon"
      v-model="model"
      type="text"
      :manual-input="manualInput"
      :show-icon="true"
      :show-button-bar="true"
      :show-time="showTime"
      autocomplete="off"
      date-format="dd-mm-yy"
      class="w-full py-0"
      input-class="p-inputtext-sm py-2"
      @input="$emit('input', $event)"
      @keypress="$emit('keypress', $event)"
      @blur="$emit('blur', $event)"
      @hide="$emit('hide', $event)"
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
    showTime: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Date, String],
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
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    manualInput: {
      type: Boolean,
      default: true
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

<style lang="scss" scoped>
::v-deep .p-button.p-button-icon-only {
  padding-top: 0.65625rem;
  padding-bottom: 0.65625rem;
}
</style>
