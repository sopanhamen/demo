export default function ({ store, redirect }) {
  console.log("store",store)
  if (store.state.auth.loggedIn) {
    return redirect("/dashboard");
  }
}
