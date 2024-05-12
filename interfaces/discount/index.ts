export interface IDiscount {
  _id?: string
  name?: string
  code?: string
  value?: number
  type?: string
  startDate?: Date
  endDate?: Date
  maxUsers?: number
  usedCount?: number
  minOrder?: number
  isActive?: boolean
  appliesTo?: string
  tours?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface IDiscountPagination {
  result: number
  discounts: IDiscount[]
}
