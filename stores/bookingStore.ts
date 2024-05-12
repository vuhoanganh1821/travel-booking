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

  async fetchTotalCount(): Promise<void> {
    const { result } = await getAllBookings()
    this.totalCount = result
  }

  async fetchAllBookings(page = 1): Promise<void> {
    const { bookings } = await getAllBookings(`?page=${page}&limit=10`)
    this.bookings = bookings
  }

  async fetchBookingDetail(bookingId: string): Promise<void> {
    const booking = await getBookingDetail(bookingId)
    this.bookingDetail = booking
  }
}

export default BookingStore
