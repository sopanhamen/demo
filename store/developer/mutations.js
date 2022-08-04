/* eslint-disable camelcase */
import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
    SET_DEVELOPERS(state, developers) {
        state.developers = developers
    },
    ADD_DEVELOPERS(state, developers) {
        state.developers = unionBy(state.developers, developers, 'id')
    },
    ADD_DEVELOPER(state, developer) {
        state.developers.push(developer)
    },
    UPDATE_DEVELOPER(state, developer) {
        const index = state.developers.findIndex(
            (item) => item.id === developer.id
        )
        state.developers[index] = developer
    },
    SET_DEVELOPER_FORM(state, developer) {
        state.form = {
            ...developer
        }
    },
    CLEAR_DEVELOPER_FORM(state) {
        state.form = {
            ...form
        }
    },
    REMOVE_DEVELOPER(state, id) {
        const index = state.developers.findIndex((o) => o.id === id)
        if (index !== -1) {
            state.developers.splice(index, 1)
        }
    },
    updateField
}
