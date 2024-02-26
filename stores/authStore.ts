import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

export default class AuthStore {
  rootStore: RootStore
  token = ''
  user = { name: 'Dan Abramov', email: 'dan-abramov@gmail.com', avatarUrl: 'https://bit.ly/dan-abramov' }
  isLogin: boolean = false

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false, token: false })
    this.rootStore = rootStore
  }

  login(): void {
    // TODO: Integrate later
    // this.authProfile = {}
    console.log('login')
    console.log('isLogin', this.isLogin)
    this.isLogin = true
  }

  logout(): void {
    this.isLogin = false
  }
}