<template>
  <pv-dialog
    header="Agent List"
    :container-style="{ width: '60vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div class="grid grid-cols-2 gap-x-8 pb-20">
      <div>
        <h4 class="font-bold mb-2">Style Option</h4>
        <div :class="`grid grid-cols-${props.availableStyles.length}`">
          <div v-for="style in props.availableStyles" :key="style.name">
            <radio-button
              v-model="selectedStyle"
              :input-id="style"
              :value="style"
              name="style"
            />
            {{ style.label }}
          </div>
        </div>
      </div>
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
  name: 'AgentListSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedStyle: null
    }
  },

  mounted() {
    this.selectedStyle = this.props.style
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        ...this.props,
        style: this.selectedStyle
      })
    }
  }
})
</script>
