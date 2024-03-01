import axios from 'axios'

const NEXT_PUBLIC_SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT

const client_axios = axios.create({ baseURL: NEXT_PUBLIC_SERVER_ENDPOINT })

export {
    client_axios,
}