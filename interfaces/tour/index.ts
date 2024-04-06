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
  startLocation: any
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

export interface IUploadTourImage {
  thumbnailURL: string
  imagesURL: string[]
}
