export interface IUser {
  _id?: string
  fullname?: string
  username?: string
  email?: string
  emailVerificationToken?: string
  emailVerified?: boolean
  isActive?: boolean
  lastSignInAt?: Date
  role?: string
  nationality?: string
  profilePicture?: string
  profilePublishId?: string
  gender?: string
  dateOfBirth?: Date
  address?: string
  phone?: string
  passport?: string
  dateOfIssuePassport?: Date
  dateOfExpirationPassport?: Date
  googleId?: string
  typeAuth?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserPagination {
  users: IUser[]
  result: number
}

export interface IUploadUserImage {
  profilePictureURL: string
}