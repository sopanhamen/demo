import { getField } from 'vuex-map-fields'

export default {
  getProperties: (state) => state.properties,
  getFormData: (state) => state.form,
  getField
}
