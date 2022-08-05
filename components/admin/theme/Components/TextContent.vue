<template>
  <pv-dialog
    header="Text Content"
    :container-style="{ width: '60vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div>
      <label class="text-sm font-bold">Content</label>
      <pv-editor v-model="description" editor-style="height: 320px" />
    </div>
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
  name: 'TextContentSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      description: this.props.description || 'Banner'
    }
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        description: this.description
      })
    }
  }
})
</script>
