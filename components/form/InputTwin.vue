<template>
  <div class="grid grid-cols-2 gap-x-2">
    <div class="text-sm w-full">
      <form-field-input
        :value="value.min"
        :placeholder="placeholderFirst"
        :label="labelFirst"
        :type="type"
        @input="$emit('input', { ...value, min: $event })"
      />
    </div>
    <div class="text-sm w-full">
      <form-field-input
        :value="value.max"
        :placeholder="placeholderSecond"
        :label="labelSecond"
        :type="type"
        @input="$emit('input', { ...value, max: $event })"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    labelFirst: {
      type: String,
      required: true
    },
    labelSecond: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholderFirst: {
      type: String,
      default: ''
    },
    placeholderSecond: {
      type: String,
      default: ''
    }
  }
}
</script>
