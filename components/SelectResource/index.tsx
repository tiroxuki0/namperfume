import React, { useEffect, useMemo, useState } from "react"

import Image from "next/image"
import { Select, Space } from "antd"
import { BaseOptionType, DefaultOptionType, SelectProps } from "antd/es/select"
import { useQuery } from "@tanstack/react-query"
import { capitalize, get, groupBy } from "lodash"
import { useTranslation } from "react-i18next"

import { ListResponseType } from "@models/entities/ResponseType"
import { getRequest } from "@utils/request"
import { useDebounceCallback } from "@root/hooks/useDebounce"
import { ObjectLiteral } from "@models/entities/ObjectLiteral"
import { Typography } from "@components/Typography"

type SelectResourceWithServer = Partial<{
  dataTestId?: string
  shouldFetch: boolean
  responseObject: string
  labelField: string
  valueField: string
  apiVersion: string | number
  resourceApiPath: string
  fallbackOptions?: { value: string; label: string }[]
  needTranslate?: boolean
  searchParamKey?: string
  showSearch?: boolean
  delay?: number
  extraParams?: Record<string, any>
  optionRender?: (record: any) => React.ReactNode
  filterOption?: boolean
  onError?: (e: any) => void
  upperFirstLabel?: boolean
  shouldDisableOption?: (option: ObjectLiteral) => boolean
  isGroupOption?: boolean
  keyGroupOption?: string
  showImageOption?: boolean
  keyImageOption?: string
  excludeValues?: string[] // New prop to exclude items by their values
  excludeByField?: string // New prop to specify which field to check for exclusion (defaults to valueField)
  onDataLoaded?: (data: any[]) => void
}>

const getResources = (payload: SelectResourceWithServer & { search?: string }) => {
  const { resourceApiPath, apiVersion, searchParamKey, search, extraParams } = payload
  if (!resourceApiPath) return

  const baseParams = search ? { [searchParamKey ?? "search"]: search } : {}

  return getRequest({
    apiPath: resourceApiPath,
    apiVersion: apiVersion ?? 1,
    params: {
      ...extraParams,
      ...baseParams
    }
  })
}

const SelectResource = <T = any, O extends BaseOptionType | DefaultOptionType = DefaultOptionType>(
  props: Omit<React.PropsWithChildren<SelectProps<T, O>> & React.RefAttributes<any>, "options"> &
    SelectResourceWithServer
) => {
  const {
    dataTestId,
    responseObject,
    labelField,
    valueField,
    apiVersion,
    resourceApiPath,
    shouldFetch,
    fallbackOptions,
    needTranslate = false,
    searchParamKey = "search",
    showSearch = true,
    delay = 500,
    extraParams = {},
    optionRender,
    filterOption = true,
    onError,
    optionFilterProp = "label",
    upperFirstLabel = false,
    shouldDisableOption,
    isGroupOption = false,
    keyGroupOption,
    showImageOption = false,
    keyImageOption,
    excludeValues = [], // Default to empty array
    excludeByField, // Optional field to check for exclusion
    onDataLoaded,
    ...rest
  } = props

  const { t } = useTranslation()

  const [options, setOptions] = useState<O[]>([])
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const debounceSearch = useDebounceCallback((value: string) => {
    setDebouncedSearch(value)
  }, delay)

  const query = useQuery({
    queryKey: ["get-resources-for-select", resourceApiPath, debouncedSearch],
    enabled: shouldFetch,
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: () =>
      getResources({
        resourceApiPath,
        apiVersion,
        responseObject,
        search: debouncedSearch,
        searchParamKey,
        extraParams
      }) as Promise<ListResponseType<any>>
  })

  const dataSources = get(query?.data, responseObject || "data") || query?.data // query?.data used for virtual network type

  useEffect(() => {
    if (dataSources && onDataLoaded) {
      onDataLoaded(dataSources)
    }
  }, [dataSources])

  // Filter out excluded values
  const filteredDataSources = useMemo(() => {
    if (!dataSources || excludeValues.length === 0) return dataSources

    const fieldToCheck = excludeByField || valueField

    return dataSources.filter((source: any) => {
      const valueToCheck = get(source, fieldToCheck || "") || ""
      return !excludeValues.includes(valueToCheck)
    })
  }, [dataSources, excludeValues, excludeByField, valueField])

  useEffect(() => {
    onError?.(query?.error)
  }, [query?.error, onError])

  useEffect(() => {
    if (filterOption) {
      setDebouncedSearch("")
    }
    if (isGroupOption && keyGroupOption) {
      const grouped = groupBy(dataSources || [], (item: any) => get(item, keyGroupOption))

      const groupedOptions = Object.entries(grouped).map(([, items]: any) => {
        const groupLabel = get(items[0], keyGroupOption)
        return {
          label: <span>{groupLabel}</span>,
          title: (
            <Typography.TextWeight500 style={{ color: "#00000073", fontSize: 35 }}>
              {groupLabel}
            </Typography.TextWeight500>
          ),
          options: items.map((source: any) => ({
            value: valueField && valueField in source ? source[valueField] : "",
            label:
              labelField && labelField in source
                ? needTranslate
                  ? t(`select.${source[labelField]}`)
                  : source[labelField]
                : "",
            image: showImageOption ? source?.[keyImageOption as string] : "",
            record: source
          }))
        }
      })

      setOptions(groupedOptions as any)
      return
    }
    setOptions(
      (filteredDataSources || []).map((source: any) => {
        const label =
          !!labelField && labelField in source
            ? needTranslate
              ? t(`select.${source[labelField]}`, `${source[labelField]}`)
              : upperFirstLabel
                ? capitalize(source[labelField])
                : source[labelField]
            : ""

        return {
          value: get(source, valueField || "") ?? "",
          // extra option for customizing disabled props of Ant
          disabled: shouldDisableOption?.(source),
          label: label,
          record: source,
          // extra option for customizing labelRender props of Ant
          // The pattern option.title.something has been used for many places. Change it will impact many screens.
          // example: https://skylab-innogram.atlassian.net/browse/PACMIG-880
          title: source,
          image: showImageOption ? source?.[keyImageOption as string] : "",
          customNode: optionRender?.(source)
        }
      }) as O[]
    )
  }, [
    filteredDataSources,
    labelField,
    valueField,
    needTranslate,
    t,
    optionRender,
    filterOption,
    upperFirstLabel,
    shouldDisableOption,
    isGroupOption,
    keyGroupOption
  ])

  const selectOptions = useMemo(() => {
    if (!fallbackOptions?.length) return options
    const optionValues = options.map((opt: any) => opt.value)
    const deletedOptions = fallbackOptions.filter(opt => !optionValues.includes(opt.value))

    return [...options, ...deletedOptions] as O[]
  }, [options, fallbackOptions])

  return (
    <Select
      optionFilterProp={optionFilterProp}
      placeholder="Select"
      {...rest}
      data-testid={dataTestId}
      filterOption={filterOption}
      loading={rest.loading || query.isFetching}
      options={selectOptions}
      showSearch={showSearch}
      optionRender={option => (
        <Space>
          <span style={{ display: "flex", alignItems: "center", marginBottom: 0 }}>
            {showImageOption && (
              <Image
                alt={option.data.image || ""}
                height={25}
                src={option.data.image || ""}
                style={{ marginRight: 10 }}
                width={25}
              />
            )}
            {(option as any).data.customNode || option.label}
          </span>
        </Space>
      )}
      style={{
        width: "100%",
        opacity: `${rest.loading || query.isFetching ? "0.5" : 1}`,
        ...rest.style
      }}
      onSearch={
        filterOption
          ? undefined
          : value => {
              debounceSearch(value)
            }
      }
    />
  )
}

export default SelectResource
