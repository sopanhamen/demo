<template>
  <div class="flex flex-col gap-y-4 pb-20">
    <div class="flex flex-col">
      <strong>CSS Class</strong>
      <input-text
        v-model="model.classList"
        :placeholder="'class-name'"
        class="py-1 px-2"
      />
    </div>
    <div class="flex flex-col">
      <strong>Background Color</strong>
      <div class="flex gap-x-1">
        <color-picker v-model="model.backgroundColor" />
        <input-text
          v-model="model.backgroundColor"
          :placeholder="'fff'"
          class="w-full py-1 px-2"
        />
      </div>
    </div>
    <div class="flex flex-col">
      <strong>Background Image</strong>
      <input-text
        v-model="model.backgroundImage"
        :placeholder="'https://example.com/background.png'"
        class="py-1 px-2"
      />
      <img
        v-if="model.backgroundImage"
        :src="model.backgroundImage"
        class="mt-2 h-48 border-2 rounded-md"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  computed: {
    model: {
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
