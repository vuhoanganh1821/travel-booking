import { forgotPassword, login, resetPassword, signUp } from 'API/auth'
import { ILoginForm, IResetPasswordRequest, ISignUpForm } from 'interfaces/auth'
import { IUser } from 'interfaces/user'
import { makeAutoObservable } from 'mobx'
import omit from 'lodash/omit'
import RootStore from 'stores'
import { getUserById } from 'API/user'
import { PLATFORM } from 'enums/common'
import { getAccessToken } from 'utils/common'

export default class AuthStore {
  rootStore: RootStore
  token: string = ''
  user: IUser = {} as IUser
  isLogin: boolean = !!getAccessToken(PLATFORM.WEBSITE)

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false, token: false })
    this.rootStore = rootStore
  }

  async getMyUser(platform: PLATFORM): Promise<void> {
    const userId = localStorage.getItem(`${platform}UserId`) ?? sessionStorage.getItem(`${platform}UserId`)
    if (userId) {
      const user = await getUserById(userId, platform)
      this.user = user
      this.isLogin = true
    }
  }

  async getUserbyId(platform: PLATFORM): Promise<void> {
    const userId =
      localStorage.getItem(`${platform}UserId`) ??
      sessionStorage.getItem(`${platform}UserId`)
    if (userId) {
      const user = await getUserById(userId, platform)
      this.isLogin = true
      this.user = user
    }
  }

  async login(data: ILoginForm, platform: PLATFORM): Promise<void> {
    const { accessToken, user } = await login(omit(data, 'isRemember'))
    if (accessToken && user?._id) {
      if (data?.isRemember) {
        localStorage.setItem(`${platform}UserId`, user?._id)
        localStorage.setItem(`${platform}Token`, accessToken)
      } else {
        sessionStorage.setItem(`${platform}UserId`, user?._id)
        sessionStorage.setItem(`${platform}Token`, accessToken)
      }
      this.getMyUser(platform)
      this.token = accessToken
    }
  }

  async signUp(data: ISignUpForm): Promise<void> {
    const { accessToken } =  await signUp(data)
    if(accessToken){
      const loginData = { email: data?.email, password: data?.password }
      this.login({ ...loginData, isRemember: true }, PLATFORM.WEBSITE)
    }
  }

  async fogotPassword(email: string){
    await forgotPassword(email)
  }

  async resetPassword(data: IResetPasswordRequest, token: string){
    await resetPassword(data, token)
  }


  logout(platform: PLATFORM): void {
    this.isLogin = false
    this.token = ''
    this.user = {} as IUser
    localStorage.removeItem(`${platform}Token`)
    localStorage.removeItem(`${platform}UserId`)
    sessionStorage.removeItem(`${platform}Token`)
    sessionStorage.removeItem(`${platform}UserId`)
  }
}
