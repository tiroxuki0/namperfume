import { useState } from "react"

import { TablePaginationConfig } from "antd"

import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface"

import { GLOBAL_ITEM_PAGE, GLOBAL_ITEM_PER_PAGE } from "@root/constant"

export const useChangeTable = <T>(size = GLOBAL_ITEM_PER_PAGE) => {
  const [page, setPage] = useState<number>(GLOBAL_ITEM_PAGE)
  const [perPage, setPerPage] = useState<number>(size)
  const [filters, setFilters] = useState<Record<string, FilterValue | null>>({
    name: null
  })
  const [sorter, setSorter] = useState<SorterResult<T> | SorterResult<T>[]>()
  const [extra, setExtra] = useState<TableCurrentDataSource<T>>()

  const resetPagination = () => setPage(GLOBAL_ITEM_PAGE)

  const onChangeTable = (
    { pageSize, current }: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
  ) => {
    if (typeof pageSize !== "undefined") {
      setPerPage(pageSize)
      resetPagination()
    }

    if (typeof current !== "undefined") {
      setPage(current)
    }

    setFilters(filters)
    setSorter(sorter)
    setExtra(extra)
  }

  return {
    perPage,
    page: page,
    filters,
    onChangeTable,
    sorter,
    extra,
    resetPagination
  }
}

export default useChangeTable
