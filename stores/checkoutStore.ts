import { getCheckoutReview, preCheckOut } from "API/checkout";
import { ITourCart } from "interfaces/cart";
import {
  ICheckoutOrder,
  IDiscountItem,
  IItemPrices,
  IPaymentURL,
  IRequsetCheckoutReview,
  IResponseCheckOutReview,
} from "interfaces/checkout";
import { assignWith } from "lodash";
import { makeAutoObservable } from "mobx";
import RootStore from "stores";

class CheckoutStore {
  rootStore: RootStore;
  checkout: ITourCart[] = [];
  order = {} as ICheckoutOrder;
  itemPrice: IDiscountItem[] = [];
  orderSummary: IRequsetCheckoutReview = {} as IRequsetCheckoutReview
  paymentURL: string = ''
  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  setOrderSummary(data: IRequsetCheckoutReview) {
    this.orderSummary = data
  }

  async fetchCheckoutReview(data: IRequsetCheckoutReview) {
    const { checkoutReview, checkoutOrder, itemPrices } =
      await getCheckoutReview(data)
    this.checkout = checkoutReview
    this.order = checkoutOrder
    if (itemPrices) {
      this.itemPrice = itemPrices;
    }
  }

  async prePayCheckout(bookingId: string): Promise<void>{
    const {paymentURL} = await preCheckOut(bookingId)
    this.paymentURL = paymentURL
  }
}

export default CheckoutStore
