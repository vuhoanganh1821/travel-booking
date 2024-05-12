export interface IReview {
  _id?: string
  user?: string
  tour?: string
  rating?: number
  content?: string
  reviewAt?: Date
  isHidden?: boolean
  approve?: boolean
}

export interface IReviewPagination {
  result: number
  reviews: IReview[]
}
