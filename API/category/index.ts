import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { ICategory, ICategoryPagination } from 'interfaces/category'
import get from 'lodash/get'

const CATEGORY_URL = '/api/v1/categories'

export async function getAllCategories(): Promise<ICategoryPagination> {
  try {
    const response = await api.get(CATEGORY_URL, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/category', 'getAllCategories')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getCategoryDetail(categoryId: string): Promise<ICategory> {
  try {
    const response = await api.get(`${CATEGORY_URL}/${categoryId}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/category', 'getCategoryDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function createCategory(category: ICategory): Promise<void> {
  try {
    await api.post(CATEGORY_URL, category, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/category', 'createCategory')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function updateCategory(categoryId: string, category: ICategory): Promise<void> {
  try {
    await api.post(`${CATEGORY_URL}/${categoryId}`, category, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/category', 'updateCategory')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  try {
    await api.delete(`${CATEGORY_URL}/${categoryId}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/category', 'deleteCategory')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}
