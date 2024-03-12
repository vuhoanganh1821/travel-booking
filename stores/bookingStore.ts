import { getAllBookings, getBookingDetail } from 'API/booking'
import { IBooking } from 'interfaces/booking'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class BookingStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  bookings: IBooking[] = []
  totalCount: number = 0

  bookingDetail: IBooking | null = null

  async fetchAllBookings(): Promise<void> {
    const { bookings, result } = await getAllBookings()
    this.bookings = bookings
    this.totalCount = result
  }

  async fetchBookingDetail(bookingId: string): Promise<void> {
    const booking = await getBookingDetail(bookingId)
    this.bookingDetail = booking
  }
}

export default BookingStore
