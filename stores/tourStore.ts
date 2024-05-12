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
  priceOptions?: IPriceOption[] = []
  startLocation?: IStartLocation

  async fetchTotalCount(): Promise<void> {
    const { result } = await getAllTours()
    this.totalCount = result
  }

  async fetchAllTours(page = 1): Promise<void> {
    const { tours } = await getAllTours(`?page=${page}&limit=10`)
    this.tours = tours
  }

  async fetchActiveTours(): Promise<void> {
    const { tours, result } = await getActiveTours()
    this.tours = tours
    this.totalCount = result
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
