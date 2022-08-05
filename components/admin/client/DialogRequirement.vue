<template>
  <pv-dialog
    :show-header="true"
    :header="$t('client_requirement.label')"
    :visible.sync="isDisplayed"
    :position="position"
    :container-style="{ width: '50vw' }"
    :close-on-escape="true"
    :closable="true"
    :modal="true"
  >
    <admin-client-steps-requirement />
    <admin-client-form-property-visit :item="visitPropertyData" />
    <template #footer>
      <div class="flex justify-between">
        <pv-button class="p-button-secondary p-button-sm" @click="closeDialog">
          {{ $t('common.close') }}
        </pv-button>
        <pv-button class="p-button-primary p-button-sm">
          {{ $t('common.save_changes') }}
        </pv-button>
      </div>
    </template>
  </pv-dialog>
</template>

<script>
import visitPropertyData from '~/static/dummyData/admin/visitPropertyDialog.json'

export default {
  props: {
    display: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      visitPropertyData
    }
  },
  computed: {
    isDisplayed: {
      get() {
        return this.display
      },
      set(value) {
        this.$emit('update:display', value)
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:display', false)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .p-dialog {
  .p-dialog-header {
    display: flex !important;
  }
  .p-dialog-header-icon.p-dialog-header-close.p-link {
    display: flex !important;
  }
  .p-dialog-content {
    border-radius: 0 !important;
    padding: 0 1.5rem 1.5rem 1.5rem !important;
  }
}
</style>
