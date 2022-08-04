import { app } from '~/config'

export const form = {
    name_km: null,
    name_en: null,
    province_id: app.default_province,
    province: {
        country_id: app.default_country
    },
    boundary: null,
    center: null,
    published: true
}
