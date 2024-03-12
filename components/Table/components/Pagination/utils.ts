export function truncatePagination(currentPage: number, numberOfPages: number): string[] {
  try {
    const delta = 1
    const left = currentPage - delta
    const right = currentPage + delta + 1
    let previousPage: number
    const result: string[] = []

    const rawDisplayPageRange = Array.from({ length: numberOfPages }, (_, item) => item + 1)
    const processedDisplayPageRange = rawDisplayPageRange.filter(
      (page) => page === 1 || page === numberOfPages || (page >= left && page < right)
    )

    processedDisplayPageRange.forEach((page) => {
      if (previousPage) {
        if (page - previousPage === 2) {
          result.push(String(previousPage + 1))
        } else if (page - previousPage !== 1) {
          result.push('...')
        }
      }
      result.push(String(page))
      previousPage = page
    })

    return result
  } catch (error) {
    console.error('components/Table/components/Pagination/utils.ts ->', 'truncatePagination ->', error)
    return []
  }
}
