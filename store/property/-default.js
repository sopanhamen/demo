/* eslint-disable camelcase */
import { add } from 'date-fns'
import { PriceType } from '@/enums/PriceType'
import { FormLayout } from '@/enums/FormLayout'
import { ListingStatus } from '@/enums/ListingStatus'
import { LandShape } from '@/enums/LandShape'
import { LengthUnit } from '@/enums/LengthUnit'
import { Direction } from '@/enums/Direction'
import { app } from '@/config'
import { Person } from '@/enums/Person'
import { Banner } from '@/enums/Banner'

export const form = {
    id: null,
    approved_by: null,
    company_id: null,
    company_branch_id: null,
    team_id: null,
    code: null,
    property_type_id: null,
    developer_id: null,
    project_id: null,
    listing_purpose: null,
    title_deed_type: null,
    title_deed_number: null,
    banner: Banner.NO_BANNER,
    data_source: null,
    valuation_report_number: null,
    listing_date: new Date(),
    expired_listing_date: add(new Date(), { days: 90 }),
    listing_status: ListingStatus.AVAILABLE,
    selling_price: null,
    selling_price_type: PriceType.TOTAL,
    renting_price: null,
    renting_price_type: PriceType.MONTH,
    renting_terms: null,
    renting_deposit: null,
    tax_note: null,
    commission: null,
    sale_note: '',
    assignee_id: null,
    assignor_id: null,
    publishing: {
        published: true,
        published_on_website: false,
        exclusive: false,
        featured: false,
        show_map: false,
        description: null
    },
    detail: {
        // land
        land_width: null,
        land_length: null,
        land_size: null,
        land_size_unit: LengthUnit.SQUARE_METER,
        land_shape: LandShape.SQUARE,
        zoning: null,
        topography: null,
        sewerage: null,
        drainage: null,
        location_appeal: null,
        current_used: null,
        surrounding_land_used: null,

        // building
        building_width: null,
        building_length: null,
        number_of_stories: null,
        gross_building_area_size: null,
        building_main_wall: null,
        ceiling: null,
        flooring_material: null,
        roofing: null,
        window_frame: null,
        design_appeal: null,
        year_of_construction: null,
        estimated_years_usable: null,
        actual_age: null,
        effective_age: null,
        estimated_cost: null,
        number_of_mezzanines: null,
        number_of_bedrooms: null,
        number_of_bathrooms: null,

        // business
        stock_value: null,
        fixture_value: null,
        sale_revenue: null,
        number_of_employees: null,
        trading_hours: null,
        expansion_potential: null,
        year_establish: null,
        selling_reason: null
    },
    owner_contact: {
        name: null,
        primary_phone: null,
        secondary_phone: null,
        email: null
    },
    sale_contact: {
        id: null,
        name: null,
        contact_person: Person.AGENT,
        primary_phone: null,
        secondary_phone: null,
        email: null
    },
    location: {
        country_id: app.default_country,
        province_id: app.default_province,
        district_id: null,
        commune_id: null,
        village: null,
        street: null,
        house: null,
        cornered_with: null,
        lat_lng: null,
        direction: Direction.UNKNOWN,
        road_condition: null,
        direct_road_width: null
    },
    facilities: {
        electricity_supply: null,
        water_supply: null
    },
    other_facilities: [],
    other: {
        form_layout: FormLayout.SIMPLE
    },
    documents: [],
    images: []
}
