import AuthStore from './authStore'
import BookingStore from './bookingStore'
import DiscountStore from './discountStore'
import SpinnerStore from './spinnerStore'
import TourStore from './tourStore'
import UserStore from './userStore'

export default class RootStore {
  authStore: AuthStore
  tourStore: TourStore
  userStore: UserStore
  bookingStore: BookingStore
  spinnerStore: SpinnerStore
  discountStore: DiscountStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.tourStore = new TourStore(this)
    this.userStore = new UserStore(this)
    this.bookingStore = new BookingStore(this)
    this.spinnerStore = new SpinnerStore(this)
    this.discountStore = new DiscountStore(this)
  }
}

export const rootStore = new RootStore()
