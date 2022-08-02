import { app } from '~/config'

export const form = {
  name_km: null,
  name_en: null,
  code: null,
  district_id: null,
  boundary: null,
  center: null,
  published: false,
  district: {
    province_id: app.default_province,
    province: {
      country_id: app.default_country
    }
  }
}
