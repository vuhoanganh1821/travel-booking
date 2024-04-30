import { getCheckoutReview } from 'API/checkout'
import { ITourCart } from 'interfaces/cart'
import {
  ICheckoutOrder,
  IDiscountItem,
  IRequsetCheckoutReview,
} from 'interfaces/checkout'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class CheckoutStore {
  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  rootStore: RootStore
  checkout: ITourCart[] = []
  order = {} as ICheckoutOrder
  itemPrice: IDiscountItem[] = []

  async fetchCheckoutReview(data: IRequsetCheckoutReview) {
    const { checkoutReview, checkoutOrder, itemPrices } =
      await getCheckoutReview(data)
    this.checkout = checkoutReview
    this.order = checkoutOrder
    if (itemPrices) {
      this.itemPrice = itemPrices
    }
  }
}

export default CheckoutStore
