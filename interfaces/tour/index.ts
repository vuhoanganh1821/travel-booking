import { IPriceOption } from 'interfaces/common'

export interface ITour {
  _id: string
  code: string
  title: string
  highlights: string[]
  type: string
  summary: string
  description: string
  thumbnail: string
  images: string[]
  category: string
  interest: string
  startLocation: IStartLocation
  details: {
    title: string
    description: string
  }[]
  inclusions: string[]
  exclusions: string[]
  itinerary: ITourItinerary
  duration: number
  discountPrice: number
  discountPercentage: number
  ratingAverage: number
  numOfRating: number
  priceOptions: IPriceOption[]
  regularPrice: number
  currency: string
  isActive: boolean
  hotels: string[]
  locations: string[]
  transports: string[]
}

export interface ITourPagination {
  total: number
  docs: ITour[]
}

export interface IStartLocation {
  type?: string
  coordinates: number[]
  description: string
  address: string
}

export interface ITourItinerary {
  activity: string
  description: string
  address: string
  duration: number
  icon: string
  location: IStartLocation
}

export interface ISuggesttion {
  _id: string
  title: string
  type: string
  thumbnail: string
  loc: {
    type: string
    coordinates: [number, number]
  }
}

export interface ISearch {
  suggestions: ISuggesttion[]
  result: number
}

export interface IUploadTourImage {
  thumbnailURL: string
  imagesURL: string[]
}
