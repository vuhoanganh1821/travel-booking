import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { IReview, IReviewPagination } from 'interfaces/review'
import { IReviewTour, IReviewTourPagination,ICreateReview } from 'interfaces/reviewTour'
import get from 'lodash/get'

const REVIEW_URL = '/api/v1/reviews'

export async function getAllReviewsByAdmin(): Promise<IReviewPagination> {
  try {
    const response = await api.get(REVIEW_URL, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/review', 'getAllReviews')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getReviewDetail(reviewId: string): Promise<IReview> {
  try {
    const response = await api.get(`${REVIEW_URL}/details/${reviewId}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/review', 'getReviewDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function approveReview(reviewId: string): Promise<void> {
  try {
    await api.get(`${REVIEW_URL}/approve/${reviewId}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/review', 'approveReview')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteReview(reviewId: string): Promise<void> {
  try {
    await api.delete(`${REVIEW_URL}/${reviewId}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/review', 'deleteReview')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getReviewInTour(tourId: string): Promise<IReviewTourPagination> {
    try{
        const response = await api.get(`${REVIEW_URL}/tour/${tourId}`)
        return response.data.metadata
    } catch (error) {
        handleError(error as Error, "API/review", "getReviewInTour");
        const errorMessage: string = get(error, "data.error.message", "");
        throw new Error(errorMessage);
    }
}

export async function createReview(data: ICreateReview): Promise<void> {
    try{
        await api.post(`${REVIEW_URL}/`, data, {
            headers: auth(PLATFORM.WEBSITE)
        })
    } catch (error) {
        handleError(error as Error, "API/review", "createReview");
        const errorMessage: string = get(error, "data.error.message", "");
        throw new Error(errorMessage);
    }
}