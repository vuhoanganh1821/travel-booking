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

export interface IBookingPagination {
  bookings: IBooking[]
  result: number
}