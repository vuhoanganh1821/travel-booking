import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { IUser, IUserPagination } from 'interfaces/user'
import get from 'lodash/get'

const USER_URL = '/api/v1/users'

export async function getAllUsers(): Promise<IUserPagination> {
  try {
    const response = await api.get(USER_URL, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/user', 'getAllUsers')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getUserById(userId: string): Promise<IUser> {
  try {
    const response = await api.get(`${USER_URL}/${userId}`)
    return response.data.metadata.user
  } catch (error) {
    handleError(error as Error, 'API/user', 'getUserById')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}