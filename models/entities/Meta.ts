export type Meta = {
  page: number
  perPage: number
  nextPage?: number | null
  prevPage?: number | null
  totalPages: number
  total: number
}

export const initialMeta: Meta = {
  nextPage: null,
  page: 1,
  perPage: 10,
  prevPage: null,
  total: 0,
  totalPages: 0,
}
