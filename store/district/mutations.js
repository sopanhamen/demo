import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
    SET_DISTRICTS(state, districts) {
        state.districts = districts
    },
    ADD_DISTRICTS(state, districts) {
        state.districts = unionBy(state.districts, districts, 'id')
    },
    ADD_DISTRICT(state, district) {
        state.districts.push(district)
    },
    CLEAR_DISTRICT_FORM(state) {
        state.form = {
            ...form
        }
    },
    UPDATE_DISTRICT(state, district) {
        const index = state.districts.findIndex(
            (item) => item.id === district.id
        )
        state.districts[index] = district
    },
    SET_DISTRICT_FORM(state, district) {
        state.form = {
            ...state.form,
            ...district
        }
    },
    REMOVE_DISTRICT(state, id) {
        const index = state.districts.findIndex((o) => o.id === id)
        if (index !== -1) {
            state.districts.splice(index, 1)
        }
    },
    updateField
}
