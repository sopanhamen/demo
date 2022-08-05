<template>
  <pv-dialog
    header="Property List"
    :container-style="{ width: '70vw' }"
    :visible="true"
    :closable="false"
    :modal="true"
  >
    <div class="grid grid-cols-4 gap-x-4">
      <div class="col-span-3 pr-4 border-r border-solid">
        <h4 class="font-bold mb-2">Style Option</h4>
        <div
          v-if="props.availableStyles"
          :class="`grid grid-cols-5 mb-8 gap-y-2`"
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

        <div>
          <h4 class="font-bold mb-2">Exclusive Style</h4>
          <div v-if="props.exclusiveStyles" class="grid grid-cols-4 mb-8">
            <div
              v-for="exclusive in props.exclusiveStyles"
              :key="exclusive.name"
            >
              <radio-button
                v-model="selectedExclusive"
                :input-id="exclusive"
                :value="exclusive"
                name="exclusive"
              />
              {{ exclusive.label }}
            </div>
          </div>
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
  name: 'PropertyListSetting',

  props: {
    props: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      selectedStyle: null,
      selectedExclusive: null,
      styleProps: {
        classList: '',
        backgroundColor: '',
        backgroundImage: ''
      }
    }
  },

  mounted() {
    this.selectedStyle = this.props.style
    this.selectedExclusive = this.props.exclusive
    this.styleProps = {
      classList: this.props.classList,
      backgroundColor: this.props.backgroundColor,
      backgroundImage: this.props.backgroundImage
    }
  },

  methods: {
    onUpdate() {
      this.$emit('update', {
        ...this.props,
        ...this.styleProps,
        style: this.selectedStyle,
        exclusive: this.selectedExclusive
      })
    }
  }
})
</script>
