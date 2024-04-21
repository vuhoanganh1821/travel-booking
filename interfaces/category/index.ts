export interface ICategory {
  _id?: string
  name?: string
  image?: string
  icon?: string
  isActive?: boolean
}

export interface ICategoryPagination {
  result: number
  categories: ICategory[]
}
