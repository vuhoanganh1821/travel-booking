import api, { handleError } from 'API'
import { ITourPagination } from 'interfaces/tour'
import get from 'lodash/get'

const TOUR_URL = '/api/v1/tours'

export async function getAllTours(): Promise<ITourPagination> {
  try {
    const response = await api.get(`${TOUR_URL}/all`)
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/tour', 'getAllTours')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getActiveTours(): Promise<ITourPagination> {
  try {
    const response = await api.get(`${TOUR_URL}/active-tours/all`)
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/tour', 'getActiveTours')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}