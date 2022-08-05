<template>
  <panel :header="title" :toggleable="true">
    <admin-form-contact
      :value="value"
      :validation="validation"
      @input="$emit('input', $event)"
    >
      <template #extra>
        <slot></slot>
      </template>
    </admin-form-contact>
  </panel>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      default() {
        return this.$t('contact.label')
      }
    },
    validation: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  setup: () => ({ v$: useVuelidate() })
}
</script>
