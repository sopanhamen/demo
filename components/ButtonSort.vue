<template>
  <div class="flex flex-nowrap gap-x-2 items-center">
    <toggle-button
      v-model="sort"
      :on-label="label"
      :off-label="label"
      on-icon="pi pi-check"
      off-icon="pi pi-times"
      class="p-button-text p-button-sm bg-transparent shadow-none"
    />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    sort: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
})
</script>

<style scoped>
::v-deep .p-togglebutton,
.p-togglebutton.p-button.p-highlight,
.p-togglebutton.p-button.p-highlight:hover,
.p-togglebutton.p-button:not(.p-disabled):not(.p-highlight):hover {
  background: transparent !important;
  border: none !important;
  padding: 0.3rem;
  color: #3f3f46 !important;
}

::v-deep .p-togglebutton .p-button-icon-left,
.p-togglebutton .p-button-icon-right {
  color: white !important;
}

::v-deep .p-togglebutton.p-button.p-highlight .p-button-icon-left,
.p-togglebutton.p-button.p-highlight .p-button-icon-right {
  color: #3f3f46 !important;
}
</style>
