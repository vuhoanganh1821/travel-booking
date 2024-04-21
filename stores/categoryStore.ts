import { getAllCategories, getCategoryDetail } from 'API/category'
import { ICategory } from 'interfaces/category'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class CategoryStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  categories: ICategory[] = []
  totalCount: number = 0

  categoryDetail: ICategory | null = null

  async fetchAllCategories(): Promise<void> {
    const { categories, result } = await getAllCategories()
    this.categories = categories
    this.totalCount = result
  }

  async fetchCategoryDetail(categoryId: string): Promise<void> {
    if (categoryId) {
      const category = await getCategoryDetail(categoryId)
      this.categoryDetail = category
    } else {
      this.categoryDetail = null
    }
  }
}

export default CategoryStore
