export const proxy = {
    '/api/': {
        // target: 'http://api.appa.loc/api',
        target: 'http://localhost:8000/api',
        pathRewrite: { '^/api': '' }
    }
}
