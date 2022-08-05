<template>
  <div class="flex flex-wrap justify-between items-center space-y-2">
    <div :class="headerClass">
      <slot name="title">
        <i :class="icon" class="text-3xl" />
        <span class="text-3xl">{{ title || empty }}</span>
      </slot>
    </div>
    <client-only>
      <div v-if="buttons" class="flex flex-wrap items-start space-x-1">
        <div v-for="(button, key) in buttons" :key="button.id">
          <slot :name="button.id || button.name || key" :button="button">
            <pv-button
              v-if="isAuthorized(button)"
              :class="[
                button.style ? `p-button-${button.style}` : button.style,
                defaultStyle
              ]"
              :disabled="button.disabled || false"
              @click="handleClick(button)"
            >
              <i :class="button.icon" />
              <span class="pl-1">{{ button.text || empty }}</span>
            </pv-button>
            <span v-else></span>
          </slot>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'N/A'
    },
    icon: {
      type: String,
      default: 'fa fa-home'
    },
    buttons: {
      type: Array,
      default() {
        return []
      }
    },
    headerClass: {
      type: [Array, Object, String],
      default() {
        return 'flex items-center space-x-2 text-red-500'
      }
    }
  },
  data() {
    return {
      empty: 'N/A',
      defaultStyle: 'p-button-sm'
    }
  },
  methods: {
    buttonLink(button) {
      const isDisabled = button.disabled || false
      if (isDisabled) {
        return '#'
      }

      if (button.linkTarget) {
        const routeData = this.$router.resolve({ path: button.link })
        window.open(routeData.href, button.linkTarget)
        return true
      }

      return this.$router.push(this.localePath(button.link))
    },
    handleClick(button) {
      if (button.link) {
        this.$emit('click', button)
        this.buttonLink(button)
        return
      }

      if (button.handler) {
        button.handler(button)
        return
      }

      this.$emit('click', button)
    },
    isAuthorized(button) {
      if (typeof button.authorized !== 'undefined') {
        return button.authorized || false
      }

      return true
    }
  }
}
</script>
