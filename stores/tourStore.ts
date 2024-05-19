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

  tourDetail: ITour = {} as ITour
  priceOptions: IPriceOption[] = []
  startLocation: IStartLocation = {} as IStartLocation

  async fetchTotalCount(): Promise<void> {
    const { total } = await getAllTours()
    this.totalCount = total
  }

  async fetchAllTours(page = 1): Promise<void> {
    const { docs } = await getAllTours(`?page=${page}&limit=10`)
    this.tours = docs
  }

  async fetchActiveTours(): Promise<void> {
    const { total, docs } = await getActiveTours()
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
    this.priceOptions = tour.priceOptions
    this.startLocation = tour.startLocation
  }
}

export default TourStore
