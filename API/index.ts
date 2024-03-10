import axios from 'axios'
import { IHeader } from './constants'

const API_URL = 'http://localhost:4001'

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken && !config.headers.Authorization) {
    config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` }
  }
  return config
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.error('API', 'error', error)
  }
)

export function auth(): IHeader {
  if (typeof window === 'undefined') {
    return {}
  }
  const accessToken = localStorage.getItem('token') ?? (sessionStorage.getItem('token') || '')
  return { Authorization: `Bearer ${accessToken}` }
}

export function handleError(error: Error, filePath: string, functionName: string) {
  const errorPath = `Error: ${filePath} -> ${functionName} -> error: ${error}`
  console.error(errorPath, JSON.stringify(error))
}

export default api
