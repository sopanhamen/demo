<template>
  <pv-dialog :visible.sync="showDialog" :position="position" :modal="true">
    <!-- assign_to_agent -->
    <admin-dialog-assign-to-agency
      v-if="action == 'assign_to_agent'"
      @GetAction="closeDialog"
    />
    <!-- contact_detail -->
    <admin-form-exclusive-availability
      v-else-if="action == 'exclusive_availability'"
      @GetAction="closeDialog"
    />
    <!-- contact_detail -->
    <admin-dialog-share-to-social
      v-else-if="action == 'share'"
      @GetAction="closeDialog"
    />
    <!-- contact_detail -->
    <admin-dialog-contact-detail-dialog
      v-else-if="action == 'contact_detail'"
      :item="data"
      @close="closeDialog"
    />
    <!-- new-borrower dialog  -->
    <admin-loan-application-new-borrower
      v-else-if="action == 'new-borrower'"
      @GetAction="closeDialog"
    />
    <!-- delete  -->
    <admin-dialog-confirm-delete-dialog
      v-else-if="action == 'delete'"
      @GetAction="closeDialog"
    />
    <!-- DOCUMENTS -->
    <div v-else-if="action == 'document'" class="bg-gray-50 p-48">
      <button @click="closeDialog">
        <i class="fa fa-times fa-lg" />DOCUMENTS no component
      </button>
    </div>
    <!-- print -->
    <div v-else-if="action == 'print'" class="bg-gray-50 p-48">
      <button @click="closeDialog">
        <i class="fa fa-times fa-lg" />print no component
      </button>
    </div>
    <!-- map  -->
    <div v-else-if="action == 'map'" class="bg-gray-50 p-48">
      <button @click="closeDialog">
        <i class="fa fa-times fa-lg" />Map no component
      </button>
    </div>
    <!-- view  -->
    <div v-else-if="action == 'view'" class="bg-gray-50 p-48">
      <button @click="closeDialog">
        <i class="fa fa-times fa-lg" />View no component
      </button>
    </div>
    <!-- view  -->
    <div v-else-if="action == 'edit'" class="bg-gray-50 p-48">
      <button @click="closeDialog">
        <i class="fa fa-times fa-lg" />Edit no component
      </button>
    </div>
    <!-- else  -->
    <div v-else class="bg-gray-50 p-48">
      <button @click="closeDialog">
        <i class="fa fa-times fa-lg" /> no component
      </button>
    </div>
  </pv-dialog>
</template>

<script>
import vitsitProperty from '~/static/dummyData/admin/visitPropertyDialog.json'
import negotiationDialog from '~/static/dummyData/admin/negotiationDialog.json'
import contactDetail from '~/static/dummyData/admin/contactDetail.json'
import payment from '~/static/dummyData/admin/paymentHistory.json'

export default {
  name: 'EveryAlert',
  props: {
    action: {
      type: String,
      required: true,
      default() {
        return ''
      }
    },
    alertDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showDialog: this.alertDialog,
      vitsitProperty,
      negotiationDialog,
      payment,
      data: contactDetail,
      position: 'top'
    }
  },
  methods: {
    closeDialog(e) {
      this.$emit('CloseAlert', e)
      if (e) {
        console.log('accept')
      }
      this.displayDialog = false
    }
  }
}
</script>
