import { truncatePagination } from './utils'

describe('TEST: utils.ts', () => {
  it('Should return correct with case 3, 10', () => {
    const mockCurrentPage = 3
    const mockNumberOfPages = 10
    const mockResult = ['1', '2', '3', '4', '...', '10']
    const result = truncatePagination(mockCurrentPage, mockNumberOfPages)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult))
  })

  it('Should return correct with case 5, 9', () => {
    const mockCurrentPage = 5
    const mockNumberOfPages = 9
    const mockResult = ['1', '...', '4', '5', '6', '...', '9']
    const result = truncatePagination(mockCurrentPage, mockNumberOfPages)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult))
  })

  it('Should return correct with case 9, 9', () => {
    const mockCurrentPage = 9
    const mockNumberOfPages = 9
    const mockResult = ['1', '...', '8', '9']
    const result = truncatePagination(mockCurrentPage, mockNumberOfPages)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult))
  })

  it('Should return correct with case 0, 0', () => {
    const mockCurrentPage = 0
    const mockNumberOfPages = 0
    const mockResult: number[] = []
    const result = truncatePagination(mockCurrentPage, mockNumberOfPages)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult))
  })

  it('Should return correct with case -1, 0', () => {
    const mockCurrentPage = -1
    const mockNumberOfPages = 0
    const mockResult: number[] = []
    const result = truncatePagination(mockCurrentPage, mockNumberOfPages)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult))
  })

  it('Should return correct with case 0, -1', () => {
    const mockCurrentPage = 0
    const mockNumberOfPages = -1
    const mockResult: number[] = []
    const result = truncatePagination(mockCurrentPage, mockNumberOfPages)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult))
  })

  it('Should return correct with case null, null', () => {
    const mockCurrentPage = Number(null)
    const mockNumberOfPages = Number(null)
    const mockResult: number[] = []
    const result = truncatePagination(mockCurrentPage, mockNumberOfPages)
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mockResult))
  })
})
