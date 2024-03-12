import { getAllUsers } from 'API/user'
import { IUser } from 'interfaces/user'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class UserStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  users: IUser[] = []
  totalCount: number = 0

  async fetchAllUsers(): Promise<void> {
    const { users, result } = await getAllUsers()
    this.users = users
    this.totalCount = result
  }
}

export default UserStore
