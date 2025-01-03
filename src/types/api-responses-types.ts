type ApiPaginationResponse<T> = {
  pageParams: number[]
  pages: {
    items: T[]
    currentPage: number
    totalCount: number
    totalPages: number
  }[]
}
