import { IOption } from 'components/Dropdown'
import { PLATFORM } from 'enums/common'
import get from 'lodash/get'

export function checkValidArray<T>(array?: T[]): boolean {
  return array ? Array.isArray(array) && array?.length > 0 : false
}

export function getValidArray<T>(array?: T[]): T[] {
  return checkValidArray<T>(array) ? array || [] : []
}

export function getAccessToken(platform: PLATFORM): string {
  return localStorage.getItem(`${platform}Token`) ?? sessionStorage.getItem(`${platform}Token`) ?? ''
}

export function getOptions<T>(array: T[], labelKey: string, valueKey: string): IOption[] {
  return getValidArray(array).map(option => ({
    label: get(option, labelKey ?? ''),
    value: get(option, valueKey ?? '')
  }))
}