import { app } from '~/config'

/* eslint-disable camelcase */
export default () => ({
    companies: [],
    form: {
        name: null,
        year_established: null,
        summary: null,
        description: null,
        vision: null,
        mission: null,
        key_value: null,
        address: null,
        primary_phone: null,
        secondary_phone: null,
        email: null,
        facebook: null,
        telegram: null,
        youtube: null,
        linked_in: null,
        instagram: null,
        logo: null,
        lat_lng: null,
        published: false,
        province_id: null,
        country_id: app.default_country,
        district_id: null,
        commune_id: null,
        property_code_prefix: null,
        property_code_digit: null,
        property_code_prefix_unlisting: null,
        property_code_digit_unlisting: null
    }
})
