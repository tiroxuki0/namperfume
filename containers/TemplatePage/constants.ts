import { FilteringProperty } from "@models/entities/FilterProperty"

export const filterProperties = (translate: (key: string) => string): FilteringProperty[] => {
  return [
    {
      key: "name",
      propertyLabel: translate("providersPage.list.table.header.name"),
      groupValuesLabel: translate("providersPage.list.table.header.name"),
      shouldFetchFromServer: false
    }
  ]
}
