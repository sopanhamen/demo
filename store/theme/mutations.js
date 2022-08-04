import { updateField } from 'vuex-map-fields'
import { components } from './-default'

function mergeSettings(theme) {
    const data = { ...theme }

    Object.entries(data.pages).forEach(([pageName, pageAttr]) => {
        data.pages[pageName] = pageAttr
        data.pages[pageName].sections = pageAttr.sections.map((rowAttr) => ({
            ...rowAttr,
            columns: rowAttr.columns.map((column) => ({
                ...column,
                components: column.components.map((component) => {
                    const defaultComponent = components.find(
                        (c) => c.name === component.name
                    )

                    return {
                        ...component,
                        props: mergeProps(
                            defaultComponent.props,
                            component.props
                        )
                    }
                })
            }))
        }))
    })

    return data
}

function mergeProps(newProps, oldProps) {
    const props = {}
    Object.entries(newProps).forEach(([newPropKey, newPropVal]) => {
        if (typeof newPropVal === 'object') {
            props[newPropKey] = {
                ...newPropVal,
                ...(oldProps[newPropKey] || {})
            }
        } else if (Array.isArray(newPropVal)) {
            props[newPropKey] = {
                ...newPropVal,
                ...(oldProps[newPropKey] || [])
            }
        } else {
            props[newPropKey] =
                typeof oldProps[newPropKey] !== 'undefined'
                    ? oldProps[newPropKey]
                    : newPropVal
        }
    })

    return props
}

export default {
    UPDATE_LAYOUT(state, { layout, data }) {
        state[layout] = { ...state[layout], ...data }
    },
    MINIMIZE_SIDEBAR(state, layout) {
        state[layout].isSidebarSmall = true
        state[layout].sidebarSize = 16
    },
    MAXIMIZE_SIDEBAR(state, layout) {
        state[layout].isSidebarSmall = false
        state[layout].sidebarSize = 64
    },
    TOGGLE_SIDEBAR(state, layout) {
        state[layout].showSidebar = !state[layout].showSidebar
    },
    UPDATE_SIDEBAR_SIZE(state, { layout, size }) {
        state[layout].sidebarSize = size
    },
    SET_WEBSITE_THEME(state, theme) {
        const data = mergeSettings(theme)
        state.website = data
    },
    SET_WEBSITE_THEME_FORM(state, theme) {
        const data = mergeSettings(theme)
        state.websiteForm = data
    },
    updateField
}
