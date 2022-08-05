<template>
  <div class="text-sm">
    <label class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <select-button
      v-model="model"
      :options="options"
      :option-label="optionLabel"
      :option-value="optionValue"
      :data-key="dataKey"
      :class="fieldClass"
      class="shadow-none"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
    >
      <template #option="slotProps">
        <i
          v-if="slotProps.option.icon"
          :class="slotProps.option.icon"
          class="mx-auto text-sm"
        />
        <span v-else class="p-button-label text-sm">
          {{ slotProps.option.label }}
        </span>
      </template>
    </select-button>
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
      type: [String, Number, Object, Boolean],
      required: false,
      default: null
    },
    options: {
      type: [Object, Array],
      required: true
    },
    optionLabel: {
      type: String,
      default: null
    },
    optionValue: {
      type: String,
      default: null
    },
    dataKey: {
      type: String,
      default: 'value'
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
    fieldClass: {
      type: [String, Object],
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
