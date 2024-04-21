import { getAllLocations, getLocationDetail, searchLocations } from 'API/location'
import { ILocation } from 'interfaces/location'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class LocationStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  locations: ILocation[] = []
  totalCount: number = 0

  locationDetail: ILocation | null = null

  async fetchSearchLocations(searchText: string): Promise<void> {
    const { locations, result } = await searchLocations(searchText)
    this.locations = locations
    this.totalCount = result
  }

  async fetchAllLocations(): Promise<void> {
    const { locations, result } = await getAllLocations()
    this.locations = locations
    this.totalCount = result
  }

  async fetchLocationDetail(locationId: string): Promise<void> {
    if (locationId) {
      const location = await getLocationDetail(locationId)
      this.locationDetail = location
    } else {
      this.locationDetail = null
    }
  }
}

export default LocationStore
