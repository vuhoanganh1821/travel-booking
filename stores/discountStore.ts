import { getAllDiscounts, getDiscountDetail, searchDiscounts } from 'API/discount'
import { IDiscount } from 'interfaces/discount'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class DiscountStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  discounts: IDiscount[] = []
  totalCount: number = 0

  discountDetail: IDiscount | null = null

  async fetchSearchDiscounts(searchText: string): Promise<void> {
    const { discounts, result } = await searchDiscounts(searchText)
    this.discounts = discounts
    this.totalCount = result
  }

  async fetchAllDiscounts(): Promise<void> {
    const { discounts, result } = await getAllDiscounts()
    this.discounts = discounts
    this.totalCount = result
  }

  async fetchDiscountDetail(discountId: string): Promise<void> {
    if (discountId) {
      const discount = await getDiscountDetail(discountId)
      this.discountDetail = discount
    } else {
      this.discountDetail = null
    }
  }
}

export default DiscountStore
