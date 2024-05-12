import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { IHotel, IHotelPagination } from 'interfaces/hotel'
import get from 'lodash/get'

const HOTEL_URL = '/api/v1/hotels'

export async function searchHotels(searchText: string): Promise<IHotelPagination> {
  try {
    const response = await api.get(`${HOTEL_URL}/search/${searchText}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/hotel', 'searchHotels')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getAllHotels(): Promise<IHotelPagination> {
  try {
    const response = await api.get(HOTEL_URL, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/hotel', 'getAllHotels')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getHotelDetail(hotelId: string): Promise<IHotel> {
  try {
    const response = await api.get(`${HOTEL_URL}/${hotelId}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/hotel', 'getHotelDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function createHotel(hotel: IHotel): Promise<void> {
  try {
    await api.post(HOTEL_URL, hotel, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/hotel', 'createHotel')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}


export async function updateHotel(hotelId: string, hotel: IHotel): Promise<void> {
  try {
    await api.post(`${HOTEL_URL}/${hotelId}`, hotel, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/hotel', 'updateHotel')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteHotel(hotelId: string): Promise<void> {
  try {
    await api.delete(`${HOTEL_URL}/${hotelId}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/hotel', 'deleteHotel')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}
