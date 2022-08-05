<template>
  <div class="bg-gray-50 w-full divide-y-2">
    <div class="flex justify-between p-5">
      <span class="text-yellow-600 text-2xl">
        <i class="fa fa-warning" />
        Warning
      </span>
      <button @click="action">
        <i class="fa fa-times fa-lg" />
      </button>
    </div>
    <h1 class="p-5 w-full font-bold text-lg">
      Are you sure you want to delete ?
    </h1>
    <div class="flex justify-between p-5">
      <button
        class="px-2 h-9 hover:bg-gray-300 bg-gray-200 rounded-md"
        @click="action('close')"
      >
        Cancel
      </button>
      <button
        class="px-2 h-9 hover:bg-red-700 bg-red-600 text-white rounded-md"
        @click="action('accept')"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirm: false
    }
  },
  methods: {
    action(text) {
      if (text === 'accept') {
        this.confirm = true
      }
      this.$emit('GetAction', this.confirm)
    }
  }
}
</script>
