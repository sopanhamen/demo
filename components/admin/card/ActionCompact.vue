<template>
  <div>
    <!-- TODO: Create an list of actions button which we can passed from outside -->
    <div v-if="data" class="flex justify-between space-x-0">
      <pv-button
        v-for="row in data"
        :key="row.id"
        :title="row.title"
        :icon="row.icon"
        class="p-button-text p-button-outlined p-button-info p-button"
        @click="handleClick(row)"
      />
      <div class="dropup z-40">
        <pv-button
          icon="pi pi-ellipsis-v"
          class="p-button-text p-button-outlined p-button-secondary p-button"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Array
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialog: '',
      displayDialog: false
    }
  },
  methods: {
    handleClick({ handler, link, title }) {
      if (handler) {
        this.$emit('actionClicked', { handler, row: this.item })
      } else if (link) {
        this.$router.push(this.localePath(link))
      }
    }
  }
}
</script>
<style scoped>
@import '~/assets/css/simple-card.scss';
</style>
