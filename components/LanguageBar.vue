<template>
  <div class="lang-dropdown">
    <select
      v-model="locale"
      class="px-2 py-2 bg-transparent"
      @change="onLanguageChanged"
    >
      <option
        v-for="lang in $i18n.locales"
        :key="lang.code"
        :value="lang.code"
        class="text-black"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locale: this.$i18n.locale
    }
  },

  methods: {
    onLanguageChanged(event) {
      const locale = event.target.value
      this.$i18n.setLocaleCookie(locale)
      this.$router.replace(this.switchLocalePath(locale))
    }
  }
}
</script>
