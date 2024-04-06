import { getAllUsers, getUserById } from 'API/user'
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

  userDetail: IUser | null = null

  async fetchAllUsers(): Promise<void> {
    const filter = 'sort=-lastSignInAt'
    const { users, result } = await getAllUsers(filter)
    this.users = users
    this.totalCount = result
  }

  async fetchUserDetail(userId: string): Promise<void> {
    const user = await getUserById(userId)
    this.userDetail = user
  }
}

export default UserStore
