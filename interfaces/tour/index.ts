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

  regularPrice: number
  currency: string
  isActive: boolean
}

export interface ITourPagination {
  tours: ITour[]
  result: number
}