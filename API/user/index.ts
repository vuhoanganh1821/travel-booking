import api, { handleError } from 'API'
import { IUser } from 'interfaces/user'
import get from 'lodash/get'

const USER_URL = '/api/v1/users'

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