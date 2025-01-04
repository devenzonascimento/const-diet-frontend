export type ApiPaginationResponse<T> = {
  items: T[]
  currentPage: number
  totalCount: number
  totalPages: number
}
