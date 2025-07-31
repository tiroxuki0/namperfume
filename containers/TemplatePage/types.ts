import { SimpleItem } from "@models/entities/Base"
import { DateAt } from "@models/entities/DateAt"
import { PageParams } from "@models/entities/PageParams"
import { ListResponseType, ResponseType } from "@models/entities/ResponseType"
import React from "react"

export type GetSamplePayload = PageParams &
  Partial<{
    name: string
  }>

export type DetailSample = DateAt & {
  uuid: string
  name: string
  type?: {
    displayName: string
  }
}
export type SampleListResponse = ListResponseType<SimpleItem>
export type SampleResponse = ResponseType<DetailSample>

export type CreateSamplePayload = {
  name: string
  image: string
}

export type ItemTab = "tab_1" | "tab_2"

export type ItemSegment = {
  label: React.ReactNode
  value: ItemTab
}

export type CreateServerSizesPayload = {
  name: string
}
