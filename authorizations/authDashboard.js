import { useContext } from '@nuxtjs/composition-api'
import useAuth from '@/authorizations/useAuth'
import { Permission } from '@/enums/Permission'

export default function authDashboard() {
  const { $auth } = useContext()
  const { userCan } = useAuth()

  const canViewCompanyDashboard = () => {
    const permissions = [Permission.VIEW_COMPANY_DASHBOARD]
    return userCan(permissions) && $auth.user.profile
  }

  const canViewBranchDashboard = () => {
    const permissions = [Permission.VIEW_BRANCH_DASHBOARD]
    return userCan(permissions)
  }

  const canViewTeamDashboard = () => {
    const permissions = [Permission.VIEW_TEAM_DASHBOARD]
    return userCan(permissions)
  }

  return {
    canViewCompanyDashboard,
    canViewBranchDashboard,
    canViewTeamDashboard
  }
}
