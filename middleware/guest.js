export default function ({ store, redirect }) {
    if (store.state.auth.loggedIn) {
        console.log('====================================')
        console.log('store.state.auth.loggedIn', store.state.auth.loggedIn)
        console.log('====================================')
        return redirect('/admin')
    }
}
