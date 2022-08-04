import { app } from '@/config'

export const form = {
    bank_id: null,
    branch_name: null,
    primary_phone: null,
    secondary_phone: null,
    third_phone: null,
    email: null,
    image: null,
    country_id: app.default_country,
    province_id: app.default_province,
    district_id: null,
    commune_id: null,
    village: null,
    street: null,
    house: null,
    office_type: null,
    building: null,
    floor: null,
    lat_lng: null,
    published: false
}
