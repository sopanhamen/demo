<template>
  <div class="text-sm">
    <label class="block mb-1 font-bold">
      {{ label }}
      <span v-if="required" class="text-red-700">*</span>
    </label>
    <div class="p-inputgroup">
      <div
        v-if="position === 'left'"
        class="p-inputgroup-addon py-2"
        :class="color"
      >
        <slot name="left">
          <i v-if="icon" :class="icon"></i>
          <span v-if="addOnText" class="whitespace-nowrap">
            {{ addOnText }}
          </span>
        </slot>
      </div>
      <input-number
        v-if="type === 'number'"
        v-model="inputValue"
        :readonly="readonly"
        :placeholder="placeholder"
        :use-grouping="useGrouping"
        class="w-full p-inputtext-sm"
        @input="validateInput"
      />
      <input-number
        v-else-if="type === 'decimal'"
        v-model="inputValue"
        :min-fraction-digits="2"
        :readonly="readonly"
        :placeholder="placeholder"
        :use-grouping="useGrouping"
        class="w-full p-inputtext-sm"
        @input="validateInput"
      />
      <input-text
        v-else
        v-model="inputValue"
        :type="type"
        :readonly="readonly"
        :placeholder="placeholder"
        class="w-full p-inputtext-sm"
        @input="validateInput"
      />
      <div
        v-if="position === 'right'"
        class="p-inputgroup-addon py-2"
        :class="color"
        @click="$emit('click', $event)"
      >
        <slot name="right">
          <i v-if="icon" :class="icon"></i>
          <span v-if="addOnText" class="whitespace-nowrap">
            {{ addOnText }}
          </span>
        </slot>
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
    value: {
      type: [String, Number],
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
    },
    type: {
      type: String,
      default: 'text'
    },
    useGrouping: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    addOnText: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'bg-gray-200'
    },
    position: {
      type: String,
      default: 'left'
    },
    maxLength: {
      type: Number,
      default: undefined
    },
    minLength: {
      type: Number,
      default: undefined
    }
  },

  data() {
    return {
      inputValue: undefined
    }
  },

  watch: {
    value(newValue) {
      this.inputValue = newValue
    }
  },

  mounted() {
    this.inputValue = this.value
  },

  methods: {
    validateInput(value) {
      if (this.maxLength && String(value).length > this.maxLength) {
        this.inputValue = this.value
      }

      this.$emit('input', this.inputValue)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-inputgroup {
  position: relative;
  z-index: 1;
}
</style>
