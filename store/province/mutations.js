import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
    SET_PROVINCES(state, provinces) {
        state.provinces = provinces
    },
    ADD_PROVINCES(state, provinces) {
        state.provinces = unionBy(state.provinces, provinces, 'id')
    },
    ADD_PROVINCE(state, province) {
        state.provinces.push(province)
    },
    UPDATE_PROVINCE(state, province) {
        const index = state.provinces.findIndex(
            (item) => item.id === province.id
        )
        state.provinces[index] = province
    },
    SET_PROVINCE_FORM(state, province) {
        state.form = {
            ...state.form,
            ...province
        }
    },
    CLEAR_PROVINCE_FORM(state) {
        state.form = {
            ...form
        }
    },
    REMOVE_PROVINCE(state, id) {
        const index = state.provinces.findIndex(function (o) {
            return o.id === id
        })
        if (index !== -1) {
            state.provinces.splice(index, 1)
        }
    },
    updateField
}
