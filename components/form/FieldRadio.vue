<template>
  <div class="text-sm">
    <label class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <div :class="{ 'flex flex-row gap-x-4 mb-1': inline }">
      <div
        v-for="option of options"
        :key="option.value"
        class="p-field-radiobutton"
      >
        <radio-button
          :id="option.value"
          v-model="model"
          :name="name"
          :value="option.value"
        />
        <label :for="option.value">{{ option.label }}</label>
      </div>
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
    name: {
      type: String,
      default: 'option'
    },
    value: {
      type: [String, Number, Boolean],
      required: false,
      default: null
    },
    options: {
      type: Array,
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
    inline: {
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
