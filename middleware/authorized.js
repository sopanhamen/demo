export default function ({ $auth, redirect }) {
    if (!$auth.user.permissions) {
        return redirect('/admin/auth/login')
    }
}
