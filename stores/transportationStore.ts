import { getAllTransportations, getTransportationDetail } from 'API/transportation'
import { ITransportation } from 'interfaces/transportation'
import { makeAutoObservable } from 'mobx'
import RootStore from 'stores'

class TransportationStore {
  rootStore: RootStore
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this)
  }

  transportations: ITransportation[] = []
  totalCount: number = 0

  transportationDetail: ITransportation | null = null

  async fetchAllTransportations(): Promise<void> {
    const { transportations, result } = await getAllTransportations()
    this.transportations = transportations
    this.totalCount = result
  }

  async fetchTransportationDetail(transportationId: string): Promise<void> {
    if (transportationId) {
      const transportation = await getTransportationDetail(transportationId)
      this.transportationDetail = transportation
    } else {
      this.transportationDetail = null
    }
  }
}

export default TransportationStore
