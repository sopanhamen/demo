import { getField } from 'vuex-map-fields'

export default {
  getSideBarSize: (state) => (theme) => state[theme].sidebarSize,
  getWebsiteTheme: (state) => state.website,
  getField
}
