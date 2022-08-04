import { TeamPosition } from '~/enums/User'

export const form = {
    name: null,
    company_id: null,
    company_branch_id: null,
    users: [
        {
            user_id: null,
            level: TeamPosition.LEADER
        }
    ]
}
