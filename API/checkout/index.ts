import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import {
  IRequsetCheckoutReview,
  IResponseCheckOutReview,
} from 'interfaces/checkout'
import { get } from 'lodash'

const CHECKOUT_URL = '/api/v1/checkout'

export async function getCheckoutReview(
  data: IRequsetCheckoutReview
): Promise<IResponseCheckOutReview> {
  try {
    const response = await api.post(`${CHECKOUT_URL}/review`, data, {
      headers: auth(PLATFORM.WEBSITE),
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/checkout', 'getChekoutReview')
    const errorMessage: string =
    get(error, 'data.error.messge', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}
