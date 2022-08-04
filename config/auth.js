export const auth = {
    redirect: {
        login: '/admin/auth/login',
        home: '/admin',
        logout: '/admin/auth/login'
    },
    strategies: {
        local: {
            token: {
                property: 'access_token',
                required: true,
                type: 'Bearer',
                global: true
            },
            user: {
                property: 'data',
                autoFetch: true
            },
            endpoints: {
                login: { url: '/auth/login', method: 'post' },
                user: { url: '/auth/me', method: 'get' },
                logout: { url: '/auth/logout', method: 'post' }
            }
        }
    }
}
