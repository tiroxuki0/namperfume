"use client"

import React, { useEffect, useState } from "react"

import type { TableProps } from "antd"

type TableRowSelection<T extends object = object> = TableProps<T>["rowSelection"]

export function useRowSelection<T extends object = object>(status?: string) {
  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: T[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setSelectedRows(newSelectedRows)
  }

  const rowSelection: TableRowSelection<T> = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange
  }

  const onResetRows = () => {
    setSelectedRowKeys([])
    setSelectedRows([])
  }

  useEffect(() => {
    if (status === "success") {
      onResetRows()
    }
  }, [status])

  return {
    rowSelection,
    selectedRows,
    onResetRows
  }
}
