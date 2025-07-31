"use client"

import { useState } from "react"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
// Third-party libraries

import { TableColumnsType } from "antd"
import { useTranslation } from "react-i18next"

import { ACTION } from "@root/constant"
import useChangeTable from "@root/hooks/useChangeTable"
import { useDebounceCallback } from "@root/hooks/useDebounce"
import { useRowSelection } from "@root/hooks/useRowSelection"
import ROUTE from "@utils/pageRoutes"

import { SimpleItem } from "@models/entities/Base"
import { ObjectLiteral } from "@models/entities/ObjectLiteral"

import CustomTable from "@components/CustomTable"
import Link from "@components/Link"
import PageLayout from "@components/PageLayout"
import ProtectedRoute from "@components/ProtectedShield"
import { Typography } from "@components/Typography"

import { filterProperties } from "./constants"

import DeleteSamples from "./components/modals/DeleteSamples"
import { useGetSamples } from "./query/useGetSamples"

const Page = () => {
  const { t } = useTranslation()

  const { page, perPage, onChangeTable, resetPagination } = useChangeTable<SimpleItem>()

  const { selectedRows, rowSelection, onResetRows } = useRowSelection<SimpleItem>()

  const [search, setSearch] = useState<string>("")

  const debounced = useDebounceCallback(setSearch, 500)

  const [filteringQuery, setFilteringQuery] = useState<
    Partial<{
      name: string
    }>
  >({})

  const [modalId, setModalId] = useState<string | null>(null)

  const { samples, isFetching, meta, refetch } = useGetSamples({
    page,
    perPage,
    name: search || filteringQuery?.name
  })

  const optionsBulkAction = () => {
    return [
      {
        icon: <EditOutlined />,
        key: "edit",
        text: t("button.edit"),
        id: ACTION.EDIT,
        isHide: selectedRows.length > 1
      },
      {
        icon: <DeleteOutlined />,
        text: t("button.delete"),
        key: "delete",
        id: ACTION.DELETE,
        danger: true
      }
    ]
  }

  const columns: TableColumnsType<SimpleItem> = [
    {
      title: <Typography.TextWeight500>{t("title.name")}</Typography.TextWeight500>,
      render: (item: SimpleItem) => {
        return <Link href={`${ROUTE.TEMPLATE.DETAIL(item.uuid)}`}>{item.name}</Link>
      },
      sorter: (a, b) => a.name.localeCompare(b.name)
    }
  ]

  const handleShowModalDelete = () => {
    setModalId(ACTION.DELETE)
  }

  const formatBreadcrumb = () => {
    return {
      items: [
        {
          title: t("examplePage.breadcrumb")
        },
        {
          title: t("examplePage.title")
        }
      ]
    }
  }

  const onCancel = () => {
    setModalId(null)
    onResetRows()
  }

  const onSuccess = () => {
    if (page === 1) {
      refetch()
      return
    }
    resetPagination()
  }

  return (
    <ProtectedRoute>
      <PageLayout
        backIcon={false}
        breadcrumb={formatBreadcrumb()}
        title={t("examplePage.title")}
        type="banner"
        styles={{
          body: {
            padding: 24
          }
        }}
      >
        <CustomTable<SimpleItem>
          columns={columns}
          dataSource={samples || []}
          filterProperties={filterProperties(t)}
          loading={isFetching}
          rowKey="uuid"
          rowSelection={rowSelection}
          scroll={{ x: "max-content" }}
          selectedItems={selectedRows}
          bulkAction={{
            options: optionsBulkAction(),
            total: selectedRows?.length,
            onClearSelection: onResetRows,
            onItemClick: async (id: string) => {
              if (id === ACTION.DELETE) {
                handleShowModalDelete()
                return
              }
            }
          }}
          pagination={{
            current: page,
            pageSize: perPage,
            total: meta?.total
          }}
          setFilteringQuery={(payload: ObjectLiteral) => {
            setFilteringQuery(payload)
            resetPagination()
          }}
          onChange={onChangeTable}
          onSearch={(value: string) => {
            debounced(value)
            resetPagination()
          }}
        />
      </PageLayout>
      {modalId === ACTION.DELETE && (
        <DeleteSamples
          open
          selectedItems={selectedRows || []}
          onCancel={onCancel}
          onSuccess={onSuccess}
        />
      )}
    </ProtectedRoute>
  )
}

export default Page
