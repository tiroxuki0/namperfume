import { Meta } from "@models/entities/Meta"

export type ResponseType<T> = {
  data: T
}

export type ListResponseType<T> = {
  data: T[]
  meta: Meta
}

export type ListWithoutMetaResponseType<T> = {
  data: T[]
}
