export const i18n = {
    locales: [
        {
            code: 'en',
            name: 'English',
            file: 'en/index.js'
        },
        {
            code: 'km',
            name: 'ភាសាខ្មែរ',
            file: 'km/index.js'
        }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: process.env.LOCALE_DEFAULT || 'en',
    vueI18n: {
        vueI18nLoader: true
    },
    vuex: {
        moduleName: 'i18n',
        syncRouteParams: true
    }
}
