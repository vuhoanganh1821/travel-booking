import { getAllReviewsByAdmin, getReviewDetail } from 'API/review'
import { IReview } from 'interfaces/review'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class ReviewStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  reviews: IReview[] = []
  totalCount: number = 0

  reviewDetail: IReview | null = null

  async fetchAllReviewsByAdmin(): Promise<void> {
    const { reviews, result } = await getAllReviewsByAdmin()
    this.reviews = reviews
    this.totalCount = result
  }

  async fetchReviewDetail(reviewId: string): Promise<void> {
    if (reviewId) {
      const review = await getReviewDetail(reviewId)
      this.reviewDetail = review
    } else {
      this.reviewDetail = null
    }
  }
}

export default ReviewStore
