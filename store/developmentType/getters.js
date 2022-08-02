import { getField } from 'vuex-map-fields'

export default {
  getDevelopmentTypes: (state) => state.developmentTypes,
  getPublishedDevelopmentTypes: (state) => {
    return state.developmentTypes.filter((i) => i.published === true)
  },
  getFormData: (state) => state.form,
  getField
}
