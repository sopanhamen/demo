<template>
  <div class="flex flex-wrap justify-between items-center space-y-2">
    <div class="text-red-500 text-2xl">
      <i :class="'fa-lg fa fa-' + data.icon" />
      <span>{{ $t(data.title) || empty }}</span>
    </div>
    <div v-if="data.buttons" class="flex flex-wrap items-start">
      <button
        v-for="row in data.buttons"
        :key="row.id"
        :title="$t(row.text) || ''"
        :class="
          'ml-1 size-button-top-action h-20 rounded border-2 border-gray-300 bg-gray-50 hover:shadow hover:bg-white ' +
          row.style
        "
        @click="doAction(row)"
      >
        <i :class="'text-2xl fa fa-' + row.icon" />
        <p class="text-sm truncate w-full">
          {{ $t(row.text) || empty }}
        </p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      empty: 'N/A'
    }
  },
  methods: {
    doAction({ link, title, handler }) {
      if (handler) {
        handler()
      } else if (link) {
        this.$router.push(this.localePath(link))
      } else {
        this.$emit('alertMessage')
      }
    }
  }
}
</script>
<style scoped>
.size-button-top-action {
  width: 90px;
}
</style>
