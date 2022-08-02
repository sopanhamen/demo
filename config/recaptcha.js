export const recaptcha = {
  siteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY || '',
  hideBadge: true,
  version: 2,
  size: 'invisible',
  language: 'en-US'
}
