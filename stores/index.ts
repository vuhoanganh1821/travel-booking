import AuthStore from './authStore'
import BookingStore from './bookingStore'
import DiscountStore from './discountStore'
import LocationStore from './locationStore'
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
  locationStore: LocationStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.tourStore = new TourStore(this)
    this.userStore = new UserStore(this)
    this.bookingStore = new BookingStore(this)
    this.spinnerStore = new SpinnerStore(this)
    this.discountStore = new DiscountStore(this)
    this.locationStore = new LocationStore(this)
  }
}

export const rootStore = new RootStore()
