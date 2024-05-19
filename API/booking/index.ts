import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { IBookingDetail, IBookingInfoPagination, IBookingPagination, ICreateBookingForm, ICreateBookingRespone } from 'interfaces/booking'
import { IAddToCart } from 'interfaces/cart'
import { IRequsetCheckoutReview } from 'interfaces/checkout'
import get from 'lodash/get'

const BOOKING_URL = '/api/v1/booking'

export async function createBooking(data: ICreateBookingForm): Promise<ICreateBookingRespone> {
  try{
    const response = await api.post(`${BOOKING_URL}/`, data, {headers: auth(PLATFORM.WEBSITE)})
    return response.data.metadata;
  }catch(error){
    handleError(error as Error, 'API/booking', 'createBooking')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getAllBookings(filter = ''): Promise<IBookingPagination> {
  try {
    const response = await api.get(`${BOOKING_URL}${filter}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/booking', 'getAllBookings')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getListBooking(filter = ''): Promise<IBookingInfoPagination> {
  try {
    const response = await api.get(`${BOOKING_URL}/${filter}`, {
      headers: auth(PLATFORM.WEBSITE)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/booking', 'getAllBookings')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getBookingDetail(bookingId: string): Promise<IBookingDetail> {
  try {
    const response = await api.get(`${BOOKING_URL}/${bookingId}`, {
      headers: auth(PLATFORM.WEBSITE)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/booking', 'getBookingDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function createBookNow(data: IAddToCart): Promise<IRequsetCheckoutReview> {
  try{
    const response = await api.post(`${BOOKING_URL}/book-now`, data, {headers: auth(PLATFORM.WEBSITE)})
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/booking', 'CreateBookNow')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteBooking(bookingId: string) {
  try{
    await api.delete(`${BOOKING_URL}/${bookingId}`, {
      headers: auth(PLATFORM.WEBSITE)
    })
  } catch (error) {
    handleError(error as Error, 'API/booking', 'deleteBooking')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}