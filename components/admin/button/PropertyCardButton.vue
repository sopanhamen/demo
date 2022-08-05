<template>
  <div>
    <button
      v-for="row in item"
      :key="row.id"
      class="mr-1"
      :title="row.title"
      @click="openDialog(row.link, row.title)"
    >
      <i :class="'fa ' + row.icon + ' fa-lg p-2 border'" />
    </button>
    <admin-dialog-alert
      :alert-dialog="displayDialog"
      :action="dialog"
      @CloseAlert="closeDialog"
    />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      dialog: '',
      displayDialog: false
    }
  },
  watch: {
    alertDialog(val) {
      if (val === true) {
        this.displayDialog = true
        // 6
      }
    }
  },
  methods: {
    openDialog(link, title) {
      if (link) {
        this.$router.push(this.localePath(link))
      } else {
        this.dialog = title
        this.displayDialog = true
      }
    },
    closeDialog() {
      this.displayDialog = false
    }
  }
}
</script>
