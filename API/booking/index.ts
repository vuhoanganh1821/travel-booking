import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { IBooking, IBookingPagination } from 'interfaces/booking'
import get from 'lodash/get'

const BOOKING_URL = '/api/v1/booking'

export async function getAllBookings(): Promise<IBookingPagination> {
  try {
    const response = await api.get(BOOKING_URL, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/booking', 'getAllBookings')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getBookingDetail(bookingId: string): Promise<IBooking> {
  try {
    const response = await api.get(`${BOOKING_URL}/${bookingId}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/booking', 'getBookingById')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}