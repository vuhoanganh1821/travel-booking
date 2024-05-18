export interface IReview {
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

export interface IReviewPagination {    
    total: number
    result: number
    reviews: IReview[]
}

export interface ICreateReview{
    user: string
    tour: string
    rating: number
    content: string
}