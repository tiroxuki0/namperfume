export type PageParams = {
  page: number
  perPage: number
}

export type ListRequestParams = PageParams & {
  sort?: Array<string> | string
}
