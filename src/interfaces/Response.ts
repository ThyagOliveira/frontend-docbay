export interface IMeta {
  total: number
  currentPage: number
  perPage: number
  lastPage: number
  prev?: number | null
  next?: number | null
}
