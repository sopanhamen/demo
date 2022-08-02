export const axios = {
  proxy: process.env.NODE_ENV !== 'production',
  baseURL: process.env.API_URL,
  browserBaseURL: process.env.API_URL_BROWSER
}
