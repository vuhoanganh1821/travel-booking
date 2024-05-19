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

  async fetchAllUsers(query = '', page = 1): Promise<void> {
    const { users, total } = await getAllUsers(`?sort=-lastSignInAt${query}&page=${page}&limit=10`)
    this.users = users
    this.totalCount = total
  }

  async fetchUserDetail(userId: string, platform: PLATFORM): Promise<void> {
    const user = await getUserById(userId, platform)
    this.userDetail = user
  }

  async updateUser(data: IUser, userId: string){
    const user = await updateUser(userId, data)
    this.userDetail = user
  }
}

export default UserStore
