import axios from 'axios'
import { PLATFORM } from 'enums/common'
import { IHeader } from './constants'

const API_URL = 'http://localhost:4001'

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.error('API', 'error', error)
  }
)

export function auth(platform: PLATFORM): IHeader {
  if (typeof window === 'undefined') {
    return {}
  }
  const token = localStorage.getItem(`${platform}Token`) ?? sessionStorage.getItem(`${platform}Token`) ?? ''
  return { Authorization: `Bearer ${token}` }
}

export function handleError(error: Error, filePath: string, functionName: string) {
  const errorPath = `Error: ${filePath} -> ${functionName} -> error: ${error}`
  console.error(errorPath, JSON.stringify(error))
}

export default api
