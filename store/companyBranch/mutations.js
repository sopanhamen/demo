/* eslint-disable camelcase */
import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
  SET_COMPANY_BRANCHES(state, branches) {
    state.companyBranches = [...branches]
  },
  ADD_COMPANY_BRANCHES(state, branches) {
    state.companyBranches = unionBy(state.companyBranches, branches, 'id')
  },
  ADD_COMPANY_BRANCH(state, companyBranch) {
    state.companyBranches.push(companyBranch)
  },
  UPDATE_COMPANY_BRANCH(state, branch) {
    const index = state.companyBranches.findIndex((i) => i.id === branch.id)
    state.companyBranches[index] = branch
  },
  SET_COMPANY_BRANCH_FORM(state, companyBranch) {
    state.form = { ...state.form, ...companyBranch }
  },
  CLEAR_COMPANY_BRANCH_FORM(state) {
    state.form = { ...form }
  },
  REMOVE_COMPANY_BRANCH(state, id) {
    const index = state.companyBranches.findIndex((i) => i.id === id)
    if (index !== -1) {
      state.companyBranches.splice(index, 1)
    }
  },
  SET_COMPANY(state, company) {
    state.company = company
  },
  updateField
}
