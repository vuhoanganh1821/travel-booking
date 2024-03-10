import { IUser } from "interfaces/user";

export interface ILoginForm {
  email: string
  password: string
  isRemember: boolean
}

export interface ILoginRequest {
  email: string
  password: string
}

export interface ILoginResponse {
  accessToken: string
  user: IUser
}

export interface IResetPasswordRequest {
  newPassword: string
  confirmPassword: string
  resetPasswordToken: string
}