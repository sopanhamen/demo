import { app } from '@/config'

export const form = {
  company_id: null,
  name: null,
  primary_phone: null,
  secondary_phone: null,
  email: null,
  website: null,
  address: null,
  lat_lng: null,
  country_id: app.default_country,
  province_id: app.default_province,
  district_id: null,
  commune_id: null,
  street: null,
  published: true
}
