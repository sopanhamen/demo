<template>
  <div class="input">
    <label :for="name">{{ label }}</label>
    <input
      v-bind="$attrs"
      :class="{
        'error': hasError,
        'green': !!value && !hasError
      }"
      :aria-describedby="`${name}-error`"
      :value="value"
      :name="name"
      :id="name"
      v-on="{
        ...$listeners,
        input: event => $emit('input', event.target.value)
      }"
    >
    <p :id="`${name}-error`" class="error" v-if="hasError && error">{{ error }}</p>
    <!-- { helperText && <p className={style.errorLabel}>{helperText}</p> } -->
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number]
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false
    },
    hasError: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
</style>
