import { getAllHotels, getHotelDetail, searchHotels } from 'API/hotel'
import { IHotel } from 'interfaces/hotel'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class HotelStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  hotels: IHotel[] = []
  totalCount: number = 0

  hotelDetail: IHotel | null = null

  async fetchSearchHotels(searchText: string): Promise<void> {
    const { hotels, result } = await searchHotels(searchText)
    this.hotels = hotels
    this.totalCount = result
  }

  async fetchAllHotels(): Promise<void> {
    const { hotels, result } = await getAllHotels()
    this.hotels = hotels
    this.totalCount = result
  }

  async fetchHotelDetail(hotelId: string): Promise<void> {
    if (hotelId) {
      const hotel = await getHotelDetail(hotelId)
      this.hotelDetail = hotel
    } else {
      this.hotelDetail = null
    }
  }
}

export default HotelStore
