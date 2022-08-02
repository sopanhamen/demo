/* eslint-disable camelcase */
import { Gender } from '@/enums/Gender'
import { PriceType } from '@/enums/PriceType'
import { app } from '@/config'
import { Priority } from '@/enums/Priority'
import { RequirementResult } from '@/enums/RequirementResult'
import { RequirementService } from '@/enums/RequirementService'

export const form = {
  company_id: null,
  company_branch_id: null,
  team_id: null,
  assignee_id: null,
  client_type_id: null,
  published: true,
  source: null,
  profile_picture: null,

  contact: {
    name: null,
    primary_phone: null,
    secondary_phone: null,
    email: null,

    country_id: app.default_country,
    province_id: app.default_province,
    district_id: null,
    commune_id: null,
    address: null,
    street: null,
    house: null,

    gender: Gender.NOT_SPECIFIED,
    national_id_number: null,
    national_id_image_front: null,
    national_id_image_back: null,
    passport_number: null,
    passport_id_image_front: null,
    passport_id_image_back: null,

    telegram: null,
    line: null,
    facebook: null,
    linkedin: null,
    instagram: null,
    youtube: null,
    tiktok: null
  },

  created_at: null,
  updated_at: null,
  deleted_at: null,
  creator: null,
  updater: null,
  type: null,
  requirement: null
}

export const formRequirement = {
  budget_min: 1,
  budget_max: 1000000,
  service: RequirementService.BUY,
  price_type: PriceType.TOTAL,
  priority: Priority.MEDIUM,
  result: RequirementResult.IN_PROGRESS,
  purpose: null,
  specific_place: null,
  note: null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
  preferred_property_types: [],
  preferred_developers: [],
  preferred_projects: [],
  preferred_countries: [app.default_country],
  preferred_provinces: [app.default_province],
  preferred_districts: [],
  preferred_communes: [],
  property_id: null,
  property: null,
  client: null,
  creator: null,
  updater: null
}
