
import { resolve } from 'path'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  ssr: true,
  target: 'server',
  head: {
    title: app.name,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
  //Environment configuration
  env: {
    ApiKeyFirebase: process.env.API_KEY_FIREBASE,
    AuthDomainFirebase: process.env.AUTH_DOMAIN_FIREBASE,
    ProjectIdFirebase: process.env.PROJECT_ID_FIREBASE,
    StorageBucket: process.env.STORAGE_BUCKET,
    MessageSenderId: process.env.MESSAGING_SENDER_ID,
    AppID: process.env.APP_ID,
    ClientID: process.env.CLIENT_ID,

    EnglishCode: process.env.ENGLISH_CODE,
    KhmerCode: process.env.KHMER_CODE,

    ABAPayWayScrip: process.env.ABA_PAY_WAY_SCRIPT,
    ABAPayWayStyle: process.env.ABA_PAY_WAY_STYLE,
    ABAPayWayPlugin: process.env.ABA_PAYWAY_PLUGIN,

    BaseURL: process.env.BASE_URL,
    FacebookID: process.env.FACEBOOK_APP,

    GaTrackingID: process.env.GA_TRACKING_ID,
    ClientBaseUrl: process.env.NEXT_PUBLIC_CLIENT_BASE_URL,

    SocketBaseUrl: process.env.SOCKET_URL,
    GoogleApiKey: process.env.GOOGLE_API_KEY,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/styles/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/tailwind-components.js" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  // Custom progress bar color
  loading: { color: '#39b982' },
  alias: {
    'style': resolve(__dirname, './styles'),
    'components': resolve(__dirname, './components'),
    'shared': resolve(__dirname, './shared'),
    'layouts': resolve(__dirname, './layouts'),
  }

}
