import { ITourCart } from "interfaces/cart";

export interface IRequsetCheckoutReview {
  cart?: string;
  tours?: IRequestTour[];
  discountCode?: string;
}

export interface IRequestTour {
  tour: string;
  startDate: string;
}
export interface IResponseCheckOutReview {
  checkoutReview: ITourCart[];
  checkoutOrder: ICheckoutOrder;
  itemPrices?: IDiscountItem[];
}

export interface ICheckoutOrder {
  totalOrder: number;
  discount: number;
  totalPrice: number;
}

export interface IItemPrices {
  tour: IDiscountItem[];
}

export interface IDiscountItem {
  tour: {
    tourId: string;
    totalPrice: number;
    discountPrice: number;
  };
}
export interface ISelectedCart {
  tour: string;
  startDate: string;
}

export interface IPaymentURL {
  paymentURL: string
} 
