import { IParticipants } from "interfaces/cart";
import { ICheckoutOrder } from "interfaces/checkout";

export interface IBooking {
  _id?: string
  user?: string
  room?: string
  checkIn?: Date
  checkOut?: Date
  guests?: number
  totalAmount?: number
  paidAmount?: number
  paymentStatus?: string
  status?: string
  createdAt?: Date
  updatedAt?: Date
  personalInfo?: {
    name?: string
    email?: string
    phone?: string
    address?: string
  }
}

export interface ICreateBooking{
  _id: string
  user: string
  status: string
  checkoutOrder: ICheckoutOrder
  personalInfo: IPersonalInfo
  bookingItems: IBookingItem[]
}

export interface ICreateBookingRespone{
  booking: ICreateBooking
}

export interface IPersonalInfo{
    name: string
    phone: string
}
export interface IBookingItem{
  _id: string,
  booking: string,
  tour: {
      _id: string,
      code: string,
      title: string,
      thumbnail: string,
      numOfRating: 1,
      ratingAverage: 4
  },
  isPrivate: boolean,
  startDate: string,
  startTime: string,
  participants: IParticipants[]
  ticketCode: number,
  transports: [],
  hotels: [],   
}

export interface IBookingInfoBody {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  status: string;
  checkoutOrder: ICheckoutOrder
  personalInfo: IPersonalInfo
  payment?: IPayment
}

export interface IBookingDetail {
  _id: string
  user: string  
  discount: string
  status: string
  checkoutOrder: ICheckoutOrder
  personalInfo: IPersonalInfo
  payment?: IPayment
  bookingItems: IBookingItem[]
}

export interface IBookingInfoPagination {
  bookings: IBookingInfoBody[];
  total: number;
}

export interface IBookingPagination {
  bookings: IBooking[];
  result: number;
  total: number;
}

export interface ITourBookingInfo {
  tour: string;
  startDate: string;
}

export interface ICreateBookingForm {
  cart: string;
  tours?: ITourBookingInfo[];
  personalInfo: {
    fullname: string;
    phone: string;
  };
  discountCode?: string
}

export interface IPayment {
  method: string;
  transactionNo: string;
  bankCode: string;
  bankTranNo: string;
  amount: string;
}