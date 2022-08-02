module.exports = {
  important: true,
  darkMode: 'class',
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US'
  },
  content: [
    `./components/**/*.js`,
    `./components/**/*.vue`,
    `./layouts/**/*.vue`,
    `./layouts/**/*.js`,
    `./pages/**/*.vue`,
    `./pages/**/*.js`,
    `./plugins/**/*.js`,
    `./enums/*.js`
  ],
  safelist: [
    { pattern: /w-*/ },
    { pattern: /h-*/ },
    { pattern: /p-*/ },
    { pattern: /px-*/ },
    { pattern: /py-*/ },
    { pattern: /m-*/ },
    { pattern: /mx-*/ },
    { pattern: /my-*/ },
    { pattern: /bg-*/ }
  ],
  theme: {
    zIndex: {
      0: 0,
      5: 5,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      25: 25,
      75: 75,
      90: 90,
      100: 100,
      auto: 'auto'
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-thick': 'var(--color-primary-thick)',
        'primary-light': 'var(--color-primary-light)',
        'primary-lighter': 'var(--color-primary-lighter)',
        secondary: 'var(--color-secondary)',
        light: 'var(--color-light)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)'
      },
      height: {
        128: '32rem'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active']
    }
  },
  container: {
    center: true,
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1280px'
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px'
          },
          '@screen md': {
            maxWidth: '768px'
          },
          '@screen lg': {
            maxWidth: '1024px'
          },
          '@screen xl': {
            maxWidth: '1280px'
          },
          '@screen 2xl': {
            maxWidth: '1280px'
          }
        }
      })
    }
  ]
}
