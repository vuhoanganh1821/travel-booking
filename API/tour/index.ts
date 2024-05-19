import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { ITourPagination, ISearch, ITour } from 'interfaces/tour'
import get from 'lodash/get'

const TOUR_URL = '/api/v1/tours'

export async function getAllTours(filter = ''): Promise<ITourPagination> {
  try {
    const response = await api.get(`${TOUR_URL}/all${filter}`)
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
    return response.data.metadata.tours
  } catch (error) {
    handleError(error as Error, 'API/tour', 'getActiveTours')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function searchTour(inputValue: string): Promise<ISearch> {
  try {
    const response = await api.get(`/api/v1/search/${inputValue}?limit=5`)
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

export async function createTour(data: ITour): Promise<ITour> {
  try {
    const response = await api.post(TOUR_URL, data, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/tour', 'createTour')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function updateTourDetail(tourId: string, data: ITour): Promise<ITour> {
  try {
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
    await api.delete(`${TOUR_URL}/${tourId}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/tour', 'deleteTour')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}