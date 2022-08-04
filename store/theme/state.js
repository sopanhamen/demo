import { components, websiteLayout } from './-default'

/* eslint-disable camelcase */
export default () => ({
    admin: {
        showSidebar: true,
        isSidebarSmall: false,
        sidebarCollapsed: false,
        sidebarSize: 64,
        windowWidth: 0,
        selectedItem: null,
        selectedSubItem: null,
        openedSubMenu: []
    },
    website: {
        ...websiteLayout
    },
    websiteForm: {
        ...websiteLayout
    },
    components
})
