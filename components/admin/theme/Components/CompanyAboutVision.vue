<template>
  <pv-dialog
    header="About Vision & Mission"
    :container-style="{ width: '70vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div class="grid grid-cols-4 gap-x-4">
      <div class="col-span-3 border-r border-solid pr-4">
        <h4 class="font-bold mb-2">Style Option</h4>
        <div :class="`grid grid-cols-${props.availableStyles.length} mb-8`">
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

        <div class="flex flex-col gap-y-2 w-full">
          <h4 class="font-bold mb-2">Detail Option</h4>
          <form-field-input
            v-model="imageUrl"
            label="Image"
            placeholder="https://something.com/someimage.jpg"
            class="w-full"
          />
          <div>
            <label class="text-sm font-bold">Vision</label>
            <pv-editor v-model="vision" editor-style="height: 150px" />
          </div>
          <div>
            <label class="text-sm font-bold">Mission</label>
            <pv-editor v-model="mission" editor-style="height: 150px" />
          </div>
          <div>
            <label class="text-sm font-bold">Core Values</label>
            <pv-editor v-model="coreValue" editor-style="height: 150px" />
          </div>
        </div>
      </div>
      <admin-theme-component-style v-model="styleProp" />
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
  name: 'CompanyAboutVisionSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedStyle: null,
      imageUrl: this.props.imageUrl || '',
      vision: this.props.vision || '',
      mission: this.props.mission || '',
      coreValue: this.props.coreValue || '',
      styleProp: {
        classList: '',
        backgroundColor: '',
        backgroundImage: ''
      }
    }
  },

  mounted() {
    this.selectedStyle = this.props.style
    this.imageUrl = this.props.imageUrl
    this.vision = this.props.vision
    this.mission = this.props.mission
    this.coreValue = this.props.coreValue
    this.styleProp = {
      classList: this.classList,
      backgroundColor: this.backgroundColor,
      backgroundImage: this.backgroundImage
    }
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        ...this.props,
        ...this.styleProp,
        style: this.selectedStyle,
        imageUrl: this.imageUrl,
        vision: this.vision,
        mission: this.mission,
        coreValue: this.coreValue
      })
    }
  }
})
</script>
