import AuthStore from './authStore'
import BookingStore from './bookingStore'
import CategoryStore from './categoryStore'
import DiscountStore from './discountStore'
import LocationStore from './locationStore'
import SpinnerStore from './spinnerStore'
import TourStore from './tourStore'
import TransportationStore from './transportationStore'
import UserStore from './userStore'

export default class RootStore {
  authStore: AuthStore
  tourStore: TourStore
  userStore: UserStore
  bookingStore: BookingStore
  spinnerStore: SpinnerStore
  categoryStore: CategoryStore
  discountStore: DiscountStore
  locationStore: LocationStore
  transportationStore: TransportationStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.tourStore = new TourStore(this)
    this.userStore = new UserStore(this)
    this.bookingStore = new BookingStore(this)
    this.spinnerStore = new SpinnerStore(this)
    this.categoryStore = new CategoryStore(this)
    this.discountStore = new DiscountStore(this)
    this.locationStore = new LocationStore(this)
    this.transportationStore = new TransportationStore(this)
  }
}

export const rootStore = new RootStore()
