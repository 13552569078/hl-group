export interface DataFetcherParams {
  pageSize: number
  currentPage: number
  params: any
  setTotal: (total: number) => void
}
