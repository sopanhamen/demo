import { Permission } from '@/enums/Permission'

export const form = {
  id: null,
  name: null,
  published: true,
  created_at: null,
  updated_at: null,
  creator: {},
  updater: {},
  users: [],
  permissions: [
    Permission.VIEW_PROPERTY,
    Permission.VIEW_EXCLUSIVE,
    Permission.VIEW_PROPERTY_TYPE,
    Permission.VIEW_DEVELOPMENT_TYPE,
    Permission.VIEW_LOCATION
  ]
}
