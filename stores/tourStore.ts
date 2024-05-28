import { getActiveTours, getAllTours, getTourDetail, searchTour } from 'API/tour'
import { IPriceOption } from 'interfaces/common'
import { ITour, ISuggesttion, IStartLocation } from 'interfaces/tour'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class TourStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  tours: ITour[] = []
  totalCount: number = 0

  suggestions: ISuggesttion[] = []
  totalSreachResult: number = 0

  tourDetail: ITour | null = null
  priceOptions: IPriceOption[] | null = null
  startLocation: IStartLocation | null = null

  async fetchTotalCount(): Promise<void> {
    const { total } = await getAllTours()
    this.totalCount = total
  }

  async fetchAllTours(page = 1): Promise<void> {
    const { tours } = await getAllTours(`?page=${page}&limit=10`)
    this.tours = tours
  }

  async fetchActiveTours(page = 1, filter = ''): Promise<void> {
    const { total, docs } = await getActiveTours(`?page=${page}&limit=4&${filter}`)
    this.tours = docs
    this.totalCount = total
  }

  async fetchSearchTour(inputValue: string): Promise<void> {
    const { suggestions, result } = await searchTour(inputValue)
    this.totalSreachResult = result
    this.suggestions = suggestions
  }

  async fetchTourDetail(tourId: string): Promise<void> {
    const tour = await getTourDetail(tourId)
    this.tourDetail = tour
    this.priceOptions = tour.priceOptions ?? []
    this.startLocation = tour.startLocation ?? null
  }
}

export default TourStore
