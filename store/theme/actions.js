export default {
  async editWebsiteTheme({ commit }) {
    const theme = await this.$service.setting.getTheme()
    commit('SET_WEBSITE_THEME_FORM', theme)
    return theme
  },
  async updateTheme({ state }) {
    return await this.$service.setting.updateTheme({
      theme: state.websiteForm
    })
  },
  async getTheme({ commit }) {
    const theme = await this.$service.setting.getTheme()
    commit('SET_WEBSITE_THEME', theme)
    return theme
  }
}
