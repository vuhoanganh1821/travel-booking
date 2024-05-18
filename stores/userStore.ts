import { getAllUsers, getUserById, updateUser } from 'API/user'
import { PLATFORM } from 'enums/common'
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

  async fetchTotalCount(): Promise<void> {
    const { result } = await getAllUsers()
    this.totalCount = result
  }

  async fetchAllUsers(query = '', page = 1): Promise<void> {
    const { users } = await getAllUsers(`?sort=-lastSignInAt${query}&page=${page}&limit=10`)
    this.users = users
  }

  async fetchUserDetail(userId: string, platform: PLATFORM): Promise<void> {
    const user = await getUserById(userId, platform)
    this.userDetail = user
  }

  async updateUser(data: IUser, userId: string){
    const user = await updateUser(data, userId)
    this.userDetail = user
  }
}

export default UserStore
