import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { ILocation, ILocationPagination } from 'interfaces/location'
import get from 'lodash/get'

const LOCATION_URL = '/api/v1/locations'

export async function searchLocations(searchText: string): Promise<ILocationPagination> {
  try {
    const response = await api.get(`${LOCATION_URL}/search/${searchText}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/location', 'searchLocations')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getAllLocations(): Promise<ILocationPagination> {
  try {
    const response = await api.get(LOCATION_URL, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/location', 'getAllLocations')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getLocationDetail(locationId: string): Promise<ILocation> {
  try {
    const response = await api.get(`${LOCATION_URL}/${locationId}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/location', 'getLocationDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function createLocation(location: ILocation): Promise<void> {
  try {
    await api.post(LOCATION_URL, location, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/location', 'createLocation')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}


export async function updateLocation(locationId: string, location: ILocation): Promise<void> {
  try {
    await api.post(`${LOCATION_URL}/${locationId}`, location, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/location', 'updateLocation')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteLocation(locationId: string): Promise<void> {
  try {
    await api.delete(`${LOCATION_URL}/${locationId}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/location', 'deleteLocation')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}
