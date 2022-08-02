import { getField } from 'vuex-map-fields'

export default {
  getBankBranches: (state) => state.bankBranches,
  getFormData: (state) => state.form,
  getField
}
