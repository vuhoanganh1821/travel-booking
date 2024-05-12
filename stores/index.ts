import AuthStore from './authStore'
import BookingStore from './bookingStore'
import CategoryStore from './categoryStore'
import DiscountStore from './discountStore'
import HotelStore from './hotelStore'
import LocationStore from './locationStore'
import SpinnerStore from './spinnerStore'
import TourStore from './tourStore'
import TransportationStore from './transportationStore'
import UserStore from './userStore'
import CartStore from './cartStore'
import CheckoutStore from './checkoutStore'
import ReviewStore from './reviewStore'

export default class RootStore {
  authStore: AuthStore
  tourStore: TourStore
  cartStore: CartStore
  userStore: UserStore
  hotelStore: HotelStore
  reviewStore: ReviewStore
  bookingStore: BookingStore
  spinnerStore: SpinnerStore
  checkoutStore: CheckoutStore
  categoryStore: CategoryStore
  discountStore: DiscountStore
  locationStore: LocationStore
  transportationStore: TransportationStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.tourStore = new TourStore(this)
    this.cartStore = new CartStore(this)
    this.userStore = new UserStore(this)
    this.hotelStore = new HotelStore(this)
    this.reviewStore = new ReviewStore(this)
    this.bookingStore = new BookingStore(this)
    this.spinnerStore = new SpinnerStore(this)
    this.checkoutStore = new CheckoutStore(this)
    this.categoryStore = new CategoryStore(this)
    this.discountStore = new DiscountStore(this)
    this.locationStore = new LocationStore(this)
    this.transportationStore = new TransportationStore(this)
  }
}

export const rootStore = new RootStore()
