import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import {
  ICart,
  IAddToCart,
  IUpdateToCart,
  IDeleteCart,
  IUpdatedCart,
} from 'interfaces/cart'
import get from 'lodash/get'

const CART_URL = '/api/v1/carts'

export async function addToCart(data: IAddToCart): Promise<ICart> {
  try {
    const response = await api.post(`${CART_URL}/`, data, {
      headers: auth(PLATFORM.WEBSITE),
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/cart', 'addToCart')
    const errorMessage: string =
    get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getListCart(): Promise<ICart> {
  try {
    const response = await api.get(`${CART_URL}`, {
      headers: auth(PLATFORM.WEBSITE),
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/cart', 'getListCart')
    const errorMessage: string =
    get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function updateCart(data: IUpdateToCart): Promise<IUpdatedCart> {
  try {
    const response = await api.post(`${CART_URL}/update`, data, {
      headers: auth(PLATFORM.WEBSITE),
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/cart', 'updateCart')
    const errorMessage: string =
    get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteCard(data: IDeleteCart): Promise<ICart> {
  try {
    const response = await api.delete(`${CART_URL}/`, {
      data: data,
      headers: auth(PLATFORM.WEBSITE),
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/cart', 'updateCart')
    const errorMessage: string =
    get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}
