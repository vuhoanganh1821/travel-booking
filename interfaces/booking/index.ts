export interface IBooking {
  _id: string
  user: string
  room: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalAmount: number
  paidAmount: number
  paymentStatus: string
  bookingStatus: string
  createdAt: Date
  updatedAt: Date
}

export interface IBookingPagination {
  bookings: IBooking[]
  result: number
}