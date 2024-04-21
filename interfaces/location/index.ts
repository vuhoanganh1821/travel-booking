export interface ILocation {
  _id?: string
  title?: string
  type?: string
  thumbnail?: string
  loc?: {
    type: string
    coordinates: number[]
  }
}

export interface ILocationPagination {
  result: number
  locations: ILocation[]
}
