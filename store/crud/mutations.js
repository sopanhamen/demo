import { unionBy } from 'lodash'
import { modules } from './-default'

const findIndex = (moduleSate, id, column = 'id') => {
    return moduleSate.pagination.data.findIndex(function (o) {
        return o[column] === id
    })
}

export default {
    SET_PAGINATION(state, { module, pagination }) {
        state.modules[module] = {
            ...state.modules[module],
            pagination
        }
    },
    ADD_PAGINATION_DATA(state, { module, pagination }) {
        state.modules[module] = {
            ...state.modules[module],
            pagination: {
                ...pagination,
                data: unionBy(
                    state.modules[module].pagination.data,
                    pagination.data,
                    'id'
                )
            }
        }
    },
    ADD_MODULE(state, { module, options, layout }) {
        if (!state.modules[module]) {
            state.modules[module] = {
                options: { moduleName: module, ...options },
                pagination: {
                    data: [],
                    links: {},
                    meta: {}
                },
                layout
            }
        }
    },
    SET_OPTIONS(state, { module, options }) {
        state.modules[module].options = {
            ...state.modules[module].options,
            ...options
        }
    },
    UPDATE_PAGINATION_ITEM(state, { module, id, data }) {
        const moduleSate = state.modules[module]
        const index = findIndex(moduleSate, id, 'id')

        if (index !== -1) {
            const newData = { ...moduleSate.pagination.data[index], ...data }
            moduleSate.pagination.data[index] = newData
        }
    },
    DELETE_FROM_PAGINATION(state, { module, id, column }) {
        if (!state.modules[module]) {
            return false
        }

        const moduleSate = state.modules[module]
        let primaryKeyColumn = 'id'
        if (column) {
            primaryKeyColumn = column
        }

        const index = findIndex(moduleSate, id, primaryKeyColumn)
        if (index !== -1) {
            moduleSate.pagination.meta.total--
            moduleSate.pagination.data.splice(index, 1)
        }
    },
    CHANGE_LAYOUT(state, { module, layout }) {
        if (!state.modules[module]) {
            return false
        }

        state.modules[module] = {
            ...state.modules[module],
            layout
        }
    },
    CLEAR_ALL_DATA(state) {
        state.modules = { ...modules }
    }
}
