<template>
  <pv-dialog
    header="Banner"
    :container-style="{ width: '70vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div
      class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-x-4 gap-y-4"
    >
      <div class="col-span-3 pr-4 border-r border-solid">
        <div class="flex flex-col">
          <strong class="text-base">Header</strong>
          <pv-editor v-model="title" editor-style="height: 150px" />
        </div>
        <div class="flex flex-col">
          <strong>Sub Header</strong>
          <pv-editor v-model="subTitle" editor-style="height: 150px" />
        </div>
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
  name: 'BannerSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      title: this.props.title || 'Banner',
      subTitle: this.props.subTitle || 'Banner subtitle',
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
        ...this.styleProps,
        title: this.title,
        subTitle: this.subTitle
      })
    }
  }
})
</script>
