<template>
  <pv-dialog
    header="Contact Form"
    :container-style="{ width: '60vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div class="grid grid-cols-2 gap-x-8 pb-20">
      <div>
        <h4 class="font-bold mb-2">Style Option</h4>
        <div
          v-if="props.availableStyles"
          :class="`grid grid-cols-${props.availableStyles.length}`"
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
        </div>
      </div>
      <div>
        <h4 class="font-bold mb-2">Map Option</h4>
        <div>Coming soon...</div>
      </div>
    </div>
    <div class="grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
      <div class="flex flex-col">
        <strong>Description</strong>
        <input-text v-model="description" />
      </div>
      <div class="flex flex-col">
        <strong>Opening Hour</strong>
        <input-text v-model="openingHour" />
      </div>
      <div class="flex flex-col">
        <strong>Email 1</strong>
        <input-text v-model="email1" />
      </div>
      <div class="flex flex-col">
        <strong>Email 2</strong>
        <input-text v-model="email2" />
      </div>
      <div class="flex flex-col">
        <strong>Phone 1</strong>
        <input-text v-model="phone1" />
      </div>
      <div class="flex flex-col">
        <strong>Phone 2</strong>
        <input-text v-model="phone2" />
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
  name: 'ContactFormSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedStyle: null,
      description: '',
      openingHour: '',
      email1: '',
      email2: '',
      phone1: '',
      phone2: ''
    }
  },

  mounted() {
    this.selectedStyle = this.props.style
    this.description = this.props.description
    this.openingHour = this.props.openingHour
    this.email1 = this.props.email1
    this.email2 = this.props.email2
    this.phone1 = this.props.phone1
    this.phone2 = this.props.phone2
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        ...this.props,
        style: this.selectedStyle,
        description: this.description,
        openingHour: this.openingHour,
        email1: this.email1,
        email2: this.email2,
        phone1: this.phone1,
        phone2: this.phone2
      })
    }
  }
})
</script>
