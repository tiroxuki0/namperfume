import { ReactNode } from "react"

import { ObjectLiteral } from "./ObjectLiteral"

export interface PropertyFilterProperty {
  key: string
  groupValuesLabel: string
  propertyLabel: string
  propertyExtra?: string
  defaultValue?: string | number
  type?: string
}

export type SearchFilterPropertyWithOutServer = PropertyFilterProperty & {
  shouldFetchFromServer: false
  "data-testid"?: string
}

export type CustomElementPropertyWithOutServer = PropertyFilterProperty & {
  shouldFetchFromServer: false
  component: ReactNode
  valuePropName?: string
  "data-testid"?: string
}

export type SelectFilterPropertyWithOutServer = PropertyFilterProperty & {
  shouldFetchFromServer: false
  options: ObjectLiteral[]
  mode?: "multiple" | "tags"
  "data-testid"?: string
}

export type SwitchFilterProperty = PropertyFilterProperty & {
  shouldFetchFromServer?: false
  defaultChecked?: boolean
  labelFalsy?: string
  labelTruthy?: string
  valuePropName?: "checked" | "checkbox"
  "data-testid"?: string
}

export type SelectFilterPropertyWithServer = PropertyFilterProperty & {
  shouldFetchFromServer: true
  apiPath: string
  apiVersion: string | number
  responseObject: string
  labelField: string
  valueField: string
  mode?: "multiple" | "tags"
  needTranslate?: boolean
  "data-testid"?: string
  extraParams?: Record<string, any>
  optionRender?: (record: any) => React.ReactNode
  labelRender?: (record: any) => React.ReactNode
}

type FilteringPropertyWithoutServer =
  | SearchFilterPropertyWithOutServer
  | SelectFilterPropertyWithOutServer
  | CustomElementPropertyWithOutServer
  | SwitchFilterProperty

type FilteringPropertyWithServer = SelectFilterPropertyWithServer

export type FilteringProperty = FilteringPropertyWithoutServer | FilteringPropertyWithServer
