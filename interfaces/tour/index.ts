export interface ITour {
  _id: string
  code: string
  title: string
  highlights: string[]
  description: string
  thumbnail: string
  images: string[]
  category: string
  interest: string
  startLocation: ITourLocation
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
  priceOptions: ITourPriceOption[]
  regularPrice: number
  currency: string
  isActive: boolean
}

export interface ITourPagination {
  tours: ITour[]
  result: number
}

export interface ITourPriceOption {
  title?: string
  value?: number
  currency?: string
  participantsCategoryIdentifier?: string
}

export interface ITourLocation {
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
  location: ITourLocation
}

export interface IUploadTourImage {
  thumbnailURL: string
  imagesURL: string[]
}
