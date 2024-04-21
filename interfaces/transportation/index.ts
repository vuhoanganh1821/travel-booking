export interface ITransportation {
  _id?: string
  name?: string
  image?: string
  capacity?: number
  brand?: string
  isActive?: boolean
}

export interface ITransportationPagination {
  result: number
  transportations: ITransportation[]
}
