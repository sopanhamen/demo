<template>
  <client-only>
    <pv-dialog
      header="Company Description"
      :container-style="{ width: '60vw' }"
      :visible="true"
      :closable="false"
      :modal="true"
    >
      <div class="flex flex-col gap-y-2 w-full">
        <form-field-input
          v-model="imageUrl"
          label="Image"
          placeholder="https://something.com/someimage.jpg"
          class="w-full"
        />
        <div>
          <label class="text-sm font-bold">Description</label>
          <pv-editor v-model="description" editor-style="height: 320px" />
        </div>
      </div>
      <template #footer>
        <pv-button
          label="Close"
          icon="pi pi-times"
          class="p-button-text"
          @click="$emit('close', true)"
        />
        <pv-button
          label="Okay"
          icon="pi pi-check"
          autofocus
          @click="onUpdate"
        />
      </template>
    </pv-dialog>
  </client-only>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CompanyDescriptionSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      imageUrl: null,
      description: ''
    }
  },

  mounted() {
    this.imageUrl = this.props?.imageUrl
    this.description = this.props?.description
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        imageUrl: this.imageUrl,
        description: this.description
      })
    }
  }
})
</script>
