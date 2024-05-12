import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { IUploadTourImage } from 'interfaces/tour'
import { IUploadUserImage } from 'interfaces/user'
import get from 'lodash/get'

const UPLOAD_URL = '/api/v1/upload'

export async function uploadImage(type: string, data: FormData): Promise<string> {
  try {
    const response = await api.post(`${UPLOAD_URL}/image/${type}`, data, {
      headers: { 
        ...auth(PLATFORM.CMS),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data.metadata.imageURL
  } catch (error) {
    handleError(error as Error, 'API/upload', 'uploadImage')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function uploadUserImage(userId: string, data: FormData): Promise<IUploadUserImage> {
  try {
    const response = await api.post(`${UPLOAD_URL}/user/${userId}`, data, {
      headers: { 
        ...auth(PLATFORM.CMS),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/upload', 'uploadUserImage')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function uploadTourImage(tourId: string, data: FormData): Promise<IUploadTourImage> {
  try {
    const response = await api.post(`${UPLOAD_URL}/tour/${tourId}`, data, {
      headers: { 
        ...auth(PLATFORM.CMS),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/upload', 'uploadTourImage')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}