export default function ({ $auth, error, redirect }) {
  const isSuperAdmin =
    $auth &&
    $auth.user &&
    $auth.user.permissions.length > 0 &&
    $auth.user.permissions[0] === '*'

  if (isSuperAdmin) {
    return true
  }

  if ($auth.user?.teams?.length === 0) {
    return error({ statusCode: 403, message: "You don't belong to a team" })
  }

  if ($auth.user.teams > 1) {
    return redirect('/admin/choose-team')
  }

  $auth.user.current_team_id = $auth.user.teams[0].id
}
