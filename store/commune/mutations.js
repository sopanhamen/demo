import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
    SET_COMMUNES(state, communes) {
        state.communes = communes
    },
    ADD_COMMUNES(state, communes) {
        state.communes = unionBy(state.communes, communes, 'id')
    },
    ADD_COMMUNE(state, commune) {
        state.communes.push(commune)
    },
    CLEAR_COMMUNE_FORM(state) {
        state.form = {
            ...form
        }
    },

    UPDATE_COMMUNE(state, commune) {
        const index = state.communes.findIndex((item) => item.id === commune.id)
        state.communes[index] = commune
    },

    SET_COMMUNE_FORM(state, commune) {
        state.form = {
            ...commune
        }
    },

    REMOVE_COMMUNE(state, id) {
        const index = state.communes.findIndex((o) => o.id === id)
        if (index !== -1) {
            state.communes.splice(index, 1)
        }
    },
    updateField
}
