import { PLATFORM } from 'enums/common'

export function checkValidArray<T>(array?: T[]): boolean {
  return array ? Array.isArray(array) && array?.length > 0 : false
}

export function getValidArray<T>(array?: T[]): T[] {
  return checkValidArray<T>(array) ? array || [] : []
}

export function getAccessToken(platform: PLATFORM): string {
  return localStorage.getItem(`${platform}Token`) ?? sessionStorage.getItem(`${platform}Token`) ?? ''
}