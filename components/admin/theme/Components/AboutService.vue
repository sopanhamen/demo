<template>
  <pv-dialog
    header="About Service"
    :container-style="{ width: '60vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div>No available option...</div>
    <template #footer>
      <pv-button
        label="Close"
        icon="pi pi-times"
        class="p-button-text"
        @click="$emit('close', true)"
      />
      <pv-button label="Okay" icon="pi pi-check" autofocus @click="onUpdate" />
    </template>
  </pv-dialog>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AboutServiceSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  methods: {
    onUpdate() {
      this.$emit('update', {})
    }
  }
})
</script>
