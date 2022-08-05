<template>
  <button
    id="btnScrollToTop"
    onclick='window.scrollTo({top: 0, behavior: "smooth"});'
    class="fixed bottom-4 animate-bounce bg-primary hover:bg-primary-thick opacity-80 px-2 py-2 rounded-md z-75"
    :class="right || 'right-8'"
    style="display: none"
  >
    <li class="fa fa-arrow-up px-1" />
  </button>
</template>

<script>
export default {
  props: {
    right: {
      type: String,
      default: 'right-8'
    }
  },
  mounted() {
    this.scrollFunction()
    window.onscroll = function () {
      const button = document.getElementById('btnScrollToTop')
      if (!button) {
        return false
      }

      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        button.style.display = 'block'
      } else {
        button.style.display = 'none'
      }
    }
  },
  methods: {
    scrollFunction() {
      const button = document.getElementById('btnScrollToTop')
      if (!button) {
        return false
      }

      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        button.style.display = 'block'
      } else {
        button.style.display = 'none'
      }
    }
  }
}
</script>
