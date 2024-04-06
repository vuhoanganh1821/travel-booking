export interface IUser {
  _id?: string
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
  dateOfBirth?: string
  address?: string
  phone?: string
  passport?: string
  dateOfIssuePassport?: string
  dateOfExpirationPassport?: string
  googleId?: string
  typeAuth?: string
}

export interface IUserPagination {
  users: IUser[]
  result: number
}

export interface IUploadUserImage {
  profilePictureURL: string
}