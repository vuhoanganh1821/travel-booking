import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { ITransportation, ITransportationPagination } from 'interfaces/transportation'
import get from 'lodash/get'

const TRANSPORTATION_URL = '/api/v1/transportations'

export async function getAllTransportations(): Promise<ITransportationPagination> {
  try {
    const response = await api.get(TRANSPORTATION_URL, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/transportation', 'getAllTransportations')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getTransportationDetail(transportationId: string): Promise<ITransportation> {
  try {
    const response = await api.get(`${TRANSPORTATION_URL}/${transportationId}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/transportation', 'getTransportationDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function createTransportation(transportation: ITransportation): Promise<void> {
  try {
    await api.post(TRANSPORTATION_URL, transportation, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/transportation', 'createTransportation')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}


export async function updateTransportation(transportationId: string, transportation: ITransportation): Promise<void> {
  try {
    await api.post(`${TRANSPORTATION_URL}/${transportationId}`, transportation, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/transportation', 'updateTransportation')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteTransportation(transportationId: string): Promise<void> {
  try {
    await api.delete(`${TRANSPORTATION_URL}/${transportationId}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/transportation', 'deleteTransportation')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}
