import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { ITour, ITourPagination } from 'interfaces/tour'
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

export async function getTourDetail(tourId: string): Promise<ITour> {
  try {
    const response = await api.get(`${TOUR_URL}/${tourId}`)
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/tour', 'getTourDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function updateTourDetail(tourId: string, data: ITour): Promise<ITour> {
  try {
    console.log('data', data)
    const response = await api.post(`${TOUR_URL}/${tourId}`, data, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/tour', 'updateTourDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteTour(tourId: string): Promise<void> {
  try {
    await api.delete(`${TOUR_URL}/${tourId}`)
  } catch (error) {
    handleError(error as Error, 'API/tour', 'deleteTour')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}