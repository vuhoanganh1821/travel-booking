import { createBooking, getAllBookings, getBookingDetail, createBookNow, deleteBooking, getListBooking } from 'API/booking'
import { ICreateBooking, ICreateBookingForm, ICreateBookingRespone, IBookingInfoBody, IBookingDetail, IBooking } from 'interfaces/booking'
import { IAddToCart } from 'interfaces/cart'
import { IRequsetCheckoutReview } from 'interfaces/checkout'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class BookingStore {
  rootStore: RootStore
  bookings: IBooking[] = []
  bookingList: IBookingInfoBody[] = []
  totalCount: number = 0
  bookingDetail: IBookingDetail | null = null
  discountCode: string = ''
  listBooking: ICreateBooking | null = null
  bookingId: string = ''
  responeBookNow: IRequsetCheckoutReview | null = null
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  applyDiscount(discountCode: string){
    this.discountCode = discountCode
  }

  setBookingId(bookingId: string) {
    this.bookingId = bookingId
  }

  async fetchTotalCount(): Promise<void> {
    const { result } = await getAllBookings()
    this.totalCount = result
  }

  async fetchAllBookings(page = 1): Promise<void> {
    const { bookings } = await getAllBookings(`?page=${page}&limit=10`)
    this.bookings = bookings
  }

  async fetchListBooking(page = 1): Promise<void> {
    const { bookings } = await getListBooking(`list?page=${page}&limit=10`)
    this.bookingList = bookings  
  }


  async fetchBookingDetail(bookingId: string): Promise<void> {
    const booking = await getBookingDetail(bookingId)
    this.bookingDetail = booking
  }

  async createBooking(data: ICreateBookingForm): Promise<void> {
    const { booking } = await createBooking(data);
    this.listBooking = booking
  }

  async createBookNow(data: IAddToCart): Promise<void> {
    const bookNow = await createBookNow(data)
    this.responeBookNow = bookNow
  }

  async deleteBooking(bookingId: string): Promise<void>{
    await deleteBooking(bookingId)
  }
}

export default BookingStore
