import { createReview, getReviewInTour, getAllReviewsByAdmin, getReviewDetail } from 'API/review'
import { ICreateReview, IReview } from 'interfaces/review'
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

  tourReviews: IReview[] | null = null
  totalReview: number = 0
  resultReview: number = 0

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
    async getReviewInTour(tourId: string): Promise<void> {
        const { reviews, total, result } = await getReviewInTour(tourId)
        this.tourReviews = reviews
        this.totalReview = total
        this.resultReview = result
    }

    async createReview(data: ICreateReview): Promise<void> {
        await createReview(data)
    }
}

export default ReviewStore
