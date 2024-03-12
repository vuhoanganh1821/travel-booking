import AuthStore from './authStore'
import Booking from './bookingStore'
import SpinnerStore from './spinnerStore'
import TourStore from './tourStore'
import UserStore from './userStore'

export default class RootStore {
  authStore: AuthStore
  tourStore: TourStore
  userStore: UserStore
  bookingStore: Booking
  spinnerStore: SpinnerStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.tourStore = new TourStore(this)
    this.userStore = new UserStore(this)
    this.bookingStore = new Booking(this)
    this.spinnerStore = new SpinnerStore(this)
  }
}

export const rootStore = new RootStore()
