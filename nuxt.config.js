import {
    app,
    auth,
    image,
    axios,
    font,
    i18n,
    map,
    moment,
    primevue,
    // proxy,
    recaptcha,
    analytic
} from './config'

export default {
    ssr: true,
    target: 'server',

    serverMiddleware: {
        '/_ipx': '~/server/middleware/ipx.js'
    },

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: app.name,
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    manifest: {
        name: app.name,
        short_name: 'APPA Web',
        description: 'APPA Web: Real Estate Portal and Valuation System',
        theme_color: '#2C3E50',
        start_url: '/'
    },

    // Auto import components
    components: true,

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/main.scss',
        '@/assets/fonts/Battambang/battambang.scss',
        '@/assets/fonts/nunito/nunito.scss',
        '@fortawesome/fontawesome-svg-core/styles.css',
        '@/assets/css/image-carousel.scss',
        '@/assets/css/sidebar.scss',
        '@/assets/css/style.scss',
        '@/assets/css/search-bar.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~/plugins/primevue.js', ssr: false },
        { src: '~/plugins/validation-rules.js' },
        { src: '~/plugins/filters.js' },
        { src: '~/plugins/service.js' },
        { src: '~/plugins/vue-recaptcha.js' },
        { src: '~/plugins/fontawesome.js', ssr: false },
        { src: '~/plugins/vue-google-maps.js', ssr: false },
        { src: '~/plugins/vue-carousel-3d.js', ssr: false },
        { src: '~/plugins/vuex-persist', ssr: false },
        { src: '~/plugins/document', ssr: false },
        { src: '~/plugins/qrcode.js', ssr: false }
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxt/postcss8',
        '@nuxtjs/eslint-module',
        '@nuxtjs/google-analytics',
        '@nuxtjs/google-fonts',
        '@nuxtjs/stylelint-module',
        '@nuxtjs/composition-api/module',
        '@nuxtjs/dotenv',
        '@nuxtjs/moment'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxt/image',
        '@nuxtjs/i18n',
        'primevue/nuxt'
    ],

    purgeCSS: {
        whitelistPatterns: [/svg.*/, /fa.*/]
    },

    // Plugin configs
    axios,
    // proxy,
    auth,
    image,
    i18n,
    moment,
    primevue,
    googleFonts: font,

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: ['primevue', /^vue2-google-maps($|\/)/, 'pdfvuer'],
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {}
            }
        }
    },
    loading: {
        color: 'indigo',
        height: '2px'
    },
    privateRuntimeConfig: {
        axios: {
            baseURL: process.env.API_URL
        }
    },
    publicRuntimeConfig: {
        app,
        // proxy,
        axios: {
            ...axios,
            browserBaseURL: process.env.API_URL_BROWSER
        },
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
        recaptcha,
        image,
        map,
        nodeEnv: app.env,
        googleAnalytics: {
            id: analytic.id
        }
    }
}
