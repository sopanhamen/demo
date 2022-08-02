// export const state = () => ({
//   locales: ['en', 'ind'],
//   locale: 'en',
//   auth: null,
//   token: ''

// })

// export const mutations = {
//   SET_LANG (state, locale) {
//     if (state.locales.includes(locale)) {
//       state.locale = locale
//     }
//   },
//   SET_TOKEN (state, value) {
//     state.auth = value;
//     localStorage.setItem('accessToken', `Bearer ${state.auth.accessToken}`);
//   },
//   GET_TOKEN(state){
//     const token = localStorage.getItem('accessToken');
//     state.token = token;
//     console.log(token)
//   }
// }



export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
};
export const mutations = {
  UPDATE_LOGGED_USER(state, user) {
    if (user.id === state.auth.user.id) {
      state.auth.user.name = user.name;
      state.auth.user.username = user.username;
      state.auth.user.email = user.email;
    }
  },
};
export const strict = process.env.NODE_ENV !== "production";




