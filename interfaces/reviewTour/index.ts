export interface IReviewTour {
    _id: string
    user: {
        _id: string
        username: string
        email: string
        profilePicture: string
        fullname: string
    },
    tour: string
    rating: number,
    content: string
    reviewAt: Date
    isHidden: boolean,
    approve: boolean
}

export interface IReviewTourPagination {    
    total: number
    result: number
    reviews: IReviewTour[]
}

export interface ICreateReview{
    user: string
    tour: string
    rating: number
    content: string
}