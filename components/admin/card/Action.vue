<template>
  <div>
    <!-- alert dialog  -->
    <admin-dialog-alert
      :alert-dialog="displayDialog"
      :action="dialog"
      @CloseAlert="closeDialog"
    />
    <!-- TODO: Create an list of actions button which we can passed from outside -->
    <div class="flex justify-between space-x-0">
      <pv-button
        v-for="row in data"
        :key="row.id"
        :title="row.title"
        :icon="row.icon"
        class="p-button-text p-button-outlined p-button-info p-button"
        @click="handleClick(row)"
      />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardAction',
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
      } else {
        this.dialog = title
        this.displayDialog = true
      }
    },
    closeDialog(e) {
      if (e === true) {
        //
      }
      this.displayDialog = false
    },
    say(msg) {
      alert(msg)
    }
  }
}
</script>
<style scoped>
@import '~/assets/css/simple-card.scss';
</style>
