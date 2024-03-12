import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class SpinnerStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  isLoading: boolean = false

  showLoading(): void {
    this.isLoading = true
  }

  hideLoading(): void {
    this.isLoading = false
  }
}

export default SpinnerStore
