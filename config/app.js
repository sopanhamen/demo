/* eslint-disable camelcase */
export const app = {
    env: process.env.NODE_ENV || 'production',
    name: process.env.APP_NAME || 'Company Name',
    base_url: process.env.BASE_URL || 'http://localhost',
    company_name: process.env.COMPANY_NAME || 'Company Name',
    logo: process.env.COMPANY_LOGO || 'logo/sample.png',
    default_theme: process.env.THEME || 'default',
    default_country: 'bff6ddbf-2a3f-477a-bb44-8d0b42212573',
    default_province: 'bc24d551-7dcb-42e7-acf5-b72e0a22a7b7'
}
