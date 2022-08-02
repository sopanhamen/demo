import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.BaseURL} || http://localhost:3000`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'withCredential': false,
        Accept: 'application/json'
    },
})

// this instance use for fetch API on the server-site without pass any auth headers
export const apiWithoutAuth = axios.create({
    baseURL: `${process.env.BaseURL}`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})

// !TODO: testing ABA production for mobile
export const apiABAPayway = axios.create({
    baseURL: `${process.env.BaseURL}`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})

export const defaultHeader = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}

export default api
