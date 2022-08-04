import { unionBy } from 'lodash'
import { updateField } from 'vuex-map-fields'
import { form } from './-default'

export default {
    SET_COUNTRIES(state, countries) {
        state.countries = countries
    },
    ADD_COUNTRIES(state, countries) {
        state.countries = unionBy(state.countries, countries, 'id')
    },
    ADD_COUNTRY(state, country) {
        state.countries.push(country)
    },
    UPDATE_COUNTRY(state, country) {
        const index = state.countries.findIndex(
            (item) => item.id === country.id
        )
        state.countries[index] = country
    },
    SET_COUNTRY_FORM(state, country) {
        state.form = {
            ...state.form,
            ...country
        }
    },
    CLEAR_COUNTRY_FORM(state) {
        state.form = {
            ...form
        }
    },
    REMOVE_COUNTRY(state, id) {
        const index = state.countries.findIndex((o) => o.id === id)
        if (index !== -1) {
            state.countries.splice(index, 1)
        }
    },
    updateField
}
