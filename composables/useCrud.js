import { computed, ref, useStore } from '@nuxtjs/composition-api'
import { isValid, format } from 'date-fns'
import { cloneDeep } from 'lodash'

export default function useCrud(service, moduleName, defaultCrudOptions = {}) {
    const { store } = useStore('crud')

    store.commit('crud/ADD_MODULE', {
        module: moduleName,
        options: { ...defaultCrudOptions },
        layout: defaultCrudOptions.layout || 'card'
    })

    const fetching = ref(false)
    const crudOptions = computed(() =>
        store.getters['crud/getOptions'](moduleName)
    )

    const formatSorts = (sorts) => {
        return Object.keys(sorts).reduce((carry, column) => {
            if (sorts[column]) {
                carry.push(column + ':' + sorts[column])
            }

            return carry
        }, [])
    }

    const formatRelations = (relations) => {
        return relations || []
    }

    const hasValidValue = (value) => {
        return (
            typeof value !== 'undefined' &&
            value !== null &&
            value !== '' &&
            value !== 'null,null' &&
            value !== 'undefined,undefined'
        )
    }

    const formatFilterValue = (value, column, filterOptions) => {
        const operator = filterOptions[column] ? filterOptions[column] : '='
        if (operator === 'date' && value) {
            const isValidDate = isValid(new Date(value))
            return isValidDate ? format(new Date(value), 'yyyy-MM-dd') : ''
        }

        if (Array.isArray(value) && operator !== 'between') {
            return value.filter((v) => !!v)
        }

        return value
    }

    const formatFilters = (defaultFilters, filters, filterOptions) => {
        let arrFilters = {}

        if (Array.isArray(filters)) {
            for (let i = 0; i < Object.values(filters).length; i++) {
                if (hasValidValue(filters[i].value)) {
                    arrFilters[filters[i].column] = formatFilterValue(
                        filters[i].value,
                        filters[i].column,
                        filterOptions
                    )
                }
            }
        } else {
            arrFilters = Object.entries(filters).reduce(
                (carry, [column, value]) => {
                    if (hasValidValue(value)) {
                        carry[column] = value
                    }

                    return carry
                },
                {}
            )
        }

        return { ...defaultFilters, ...arrFilters }
    }

    const formatFilterOptions = (filterOptions) => {
        return Object.keys(filterOptions).map(
            (column) => column + ':' + filterOptions[column]
        )
    }

    const buildParams = (config) => {
        const params = {}

        if (config.page) {
            Object.assign(params, { page: config.page || 1 })
        }

        if (config.limit) {
            Object.assign(params, { limit: config.limit || 12 })
        }

        if (config.relations?.length > 0) {
            Object.assign(params, {
                relations: formatRelations(config.relations)
            })
        }

        if (config.counts?.length > 0) {
            Object.assign(params, { counts: formatRelations(config.counts) })
        }

        if (config.sorts) {
            Object.assign(params, { sorts: formatSorts(config.sorts) })
        }

        if (config.filters) {
            Object.assign(
                params,
                formatFilters(
                    config.defaultFilters || {},
                    config.filters,
                    config.filterOptions
                )
            )
        }

        if (config.filterOptions) {
            Object.assign(params, {
                filter_options: formatFilterOptions(config.filterOptions)
            })
        }

        return params
    }

    const defaultOptions = {
        trashed: false,
        limit: 12,
        page: 1,
        sorts: { created_at: 'desc' },
        relations: []
    }

    const fetch = async (options = {}) => {
        const allOptions = cloneDeep({
            ...defaultOptions,
            ...crudOptions.value,
            ...options
        })

        store.commit('crud/SET_OPTIONS', {
            module: moduleName,
            options: allOptions
        })

        const params = buildParams(allOptions)
        return allOptions.trashed
            ? await service.paginateTrash(params)
            : await service.paginate(params)
    }

    const fetchItems = async (options = {}) => {
        try {
            fetching.value = true

            const data = await fetch(options)

            if (typeof data !== 'undefined') {
                store.commit('crud/SET_PAGINATION', {
                    module: moduleName,
                    pagination: data
                })

                fetching.value = false

                return data
            }
        } catch (error) {
            // todo: set error message from api to vuelidate
            console.error('ERROR FETCH', error.message)
            fetching.value = false
        }
    }

    const nextItems = async (options) => {
        try {
            fetching.value = true

            const currentPage = paginationMeta.value.current_page || 1
            const lastPage = paginationMeta.value.last_page || 2

            if (currentPage >= lastPage) {
                return false
            }

            const data = await fetch({ ...options, page: currentPage + 1 })

            if (typeof data !== 'undefined') {
                store.commit('crud/ADD_PAGINATION_DATA', {
                    module: moduleName,
                    pagination: data
                })

                fetching.value = false

                return data
            }
        } catch (error) {
            // todo: set error message from api to vuelidate
            console.error('ERROR FETCH', error.message)
            fetching.value = false
        }
    }

    const clearItems = () => {
        store.commit('crud/SET_PAGINATION', {
            module: moduleName,
            pagination: []
        })
    }

    const clearFilter = async (keepFields = {}) => {
        return await fetchItems({
            ...crudOptions.value,
            page: 1,
            filters: defaultCrudOptions?.filters || [],
            sorts: defaultCrudOptions?.sorts || { created_at: 'desc' }
        })
    }

    const changeLimit = async (limit) => {
        await fetchItems({ ...crudOptions.value, limit })
    }

    const changeSort = async (payload) => {
        await fetchItems({ ...crudOptions.value, ...payload })
    }

    const changePage = async (event) => {
        await fetchItems({ ...crudOptions.value, page: event.page + 1 })
    }

    const paginationItems = computed(() => {
        return store.getters['crud/getPaginationData'](moduleName) || []
    })

    const paginationMeta = computed(() => {
        return store.getters['crud/getPaginationMeta'](moduleName) || {}
    })

    const layout = computed(() => {
        return (
            store.getters['crud/getLayout'](moduleName) ||
            defaultCrudOptions.layout ||
            'card'
        )
    })

    const changeLayout = (layout) => {
        return store.commit('crud/CHANGE_LAYOUT', {
            module: moduleName,
            layout
        })
    }

    const deleteItem = async (id, column) => {
        const res = await service.delete(id)
        if (res) {
            store.commit('crud/DELETE_FROM_PAGINATION', {
                module: moduleName,
                id,
                column
            })
        }
    }

    const restoreItem = async (id, column) => {
        const { data } = await service.restore(id)

        if (data) {
            store.commit('crud/DELETE_FROM_PAGINATION', {
                module: moduleName,
                id,
                column
            })
        }
    }

    const updateItem = (id, data) => {
        fetching.value = true

        store.commit('crud/UPDATE_PAGINATION_ITEM', {
            module: moduleName,
            id,
            data
        })

        fetching.value = false
    }

    return {
        changeLimit,
        changePage,
        changeSort,
        clearItems,
        changeLayout,
        clearFilter,
        deleteItem,
        fetchItems,
        nextItems,
        restoreItem,
        updateItem,
        crudOptions,
        fetching,
        paginationItems,
        paginationMeta,
        layout
    }
}
