/* eslint-disable camelcase */
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
    SET_BANK_BRANCHES(state, bankBranches) {
        state.bankBranches = bankBranches
    },
    ADD_BANK_BRANCH(state, bankBranch) {
        state.bankBranches.push(bankBranch)
    },
    UPDATE_BANK_BRANCH(state, bankBranch) {
        const index = state.bankBranches.findIndex(
            (i) => i.id === bankBranch.id
        )
        state.bankBranches[index] = bankBranch
    },
    SET_BANK_BRANCH_FORM(state, bankBranch) {
        state.form = { ...bankBranch }
    },
    CLEAR_BANK_BRANCH_FORM(state) {
        state.form = { ...form }
    },
    REMOVE_BANK_BRANCH(state, id) {
        const index = state.bankBranches.findIndex(function (o) {
            return o.id === id
        })

        if (index !== -1) {
            state.bankBranches.splice(index, 1)
        }
    },
    updateField
}
