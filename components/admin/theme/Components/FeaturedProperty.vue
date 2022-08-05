<template>
  <pv-dialog
    header="Featured Properties"
    :container-style="{ width: '60vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div class="grid grid-cols-4 gap-x-4">
      <div class="col-span-3 pr-4 border-r border-solid">
        <h4 class="font-bold mb-2">Style Option</h4>
        <div>No available option...</div>
        <!-- <div
          v-if="props.availableStyles"
          :class="`grid grid-cols-${props.availableStyles.length} mb-8`"
        >
          <div v-for="style in props.availableStyles" :key="style.name">
            <radio-button
              v-model="selectedStyle"
              :input-id="style"
              :value="style"
              name="style"
            />
            {{ style.label }}
          </div>
        </div> -->
      </div>
      <admin-theme-component-style v-model="styleProps" />
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
  name: 'FeaturedPropertySetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      styleProps: {
        classList: '',
        backgroundColor: '',
        backgroundImage: ''
      }
    }
  },

  mounted() {
    this.styleProps = {
      classList: this.props.classList,
      backgroundColor: this.props.backgroundColor,
      backgroundImage: this.props.backgroundImage
    }
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        ...this.styleProps
      })
    }
  }
})
</script>
