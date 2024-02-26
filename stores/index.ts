import AuthStore from './authStore'

export default class RootStore {
  authStore: AuthStore

  constructor() {
    this.authStore = new AuthStore(this)
  }
}

export const rootStore = new RootStore()
