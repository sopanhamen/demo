import { Gender } from '@/enums/Gender'
import { TeamPosition } from '@/enums/User'

export const form = {
  name: null,
  email: null,
  phone: '',
  password: null,
  password_confirmation: null,
  roles: [],
  show_on_website: false,
  is_active: true,
  profile: {
    company_id: null,
    company_branch_id: null,
    gender: Gender.NOT_SPECIFIED,
    national_id_number: null,
    national_image_front: null,
    national_image_bank: null,
    passport_number: null,
    passport_image_front: null,
    passport_image_bank: null,
    position: null,
    experience: null,
    skills: null,
    profile_picture: null,

    contact: {
      // Basic info
      name: null,
      primary_phone: '',
      secondary_phone: '',
      email: null,

      // Socials
      facebook: null,
      telegram: null,
      line: null
    }
  },

  teams: [
    {
      team_id: null,
      level: TeamPosition.MEMBER
    }
  ]
}
