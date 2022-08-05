<template>
  <pv-dialog
    header="Agent Carousel"
    :container-style="{ width: '60vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div class="flex flex-col gap-y-4 pb-12">
      <form-field-input v-model="title" label="Title" />
      <form-field-input v-model="description" label="Description" />
      <template v-if="props.availableStyles">
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
      </template>
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
  name: 'AgentCarouselSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      title: this.$t('agent.meet_our_agent'),
      description: this.$t('agent.professional_and_dedicated'),
      selectedStyle: null
    }
  },

  mounted() {
    this.selectedStyle = this.props.style
    this.title = this.props.title
    this.description = this.props.description
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        ...this.props,
        title: this.title,
        description: this.description,
        style: this.selectedStyle
      })
    }
  }
})
</script>
