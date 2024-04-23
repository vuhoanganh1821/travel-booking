import { IPriceOption } from 'interfaces/common'

export interface IHotel {
  _id?: string
  name?: string
  thumbnail?: string
  address?: string
  location?: string
  coordinates?: number[]
  priceOptions?: IPriceOption[]
}

export interface IHotelPagination {
  result: number
  hotels: IHotel[]
}
