export interface IUser {
  _id: string
  username: string
  email: string
  emailVerificationToken: string
  emailVerified: boolean
  isActive: boolean
  lastSignInAt: Date
  role: string
}