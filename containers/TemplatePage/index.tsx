"use client"

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons"
import Button from "@components/Button"
import CustomTable from "@components/CustomTable"
import Link from "@components/Link"
import PageLayout from "@components/PageLayout"
import ProtectedRoute from "@components/ProtectedShield"
import { Typography } from "@components/Typography"
import { ObjectLiteral } from "@models/entities/ObjectLiteral"
import { ACTION } from "@root/constant"
import useChangeTable from "@root/hooks/useChangeTable"
import { useDebounceCallback } from "@root/hooks/useDebounce"
import { useRowSelection } from "@root/hooks/useRowSelection"
import ROUTE from "@utils/pageRoutes"
import { TableColumnsType } from "antd"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import DeleteSamples from "./components/modals/DeleteSamples"
import { filterProperties } from "./constants"
import { useGetSamples } from "./query/useGetSamples"
import { SimpleItem } from "@models/entities/Base"

const Page = () => {
  const { t } = useTranslation()

  const router = useRouter()

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

  const handleOnClickCreate = () => {
    router.push(ROUTE.TEMPLATE.CREATE)
  }

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
        title={t("examplePage.title")}
        backIcon={false}
        type="banner"
        breadcrumb={formatBreadcrumb()}
        styles={{
          body: {
            padding: 24
          }
        }}
      >
        <CustomTable<SimpleItem>
          action={
            <Button
              icon={<PlusOutlined />}
              type="primary"
              iconPosition="start"
              onClick={handleOnClickCreate}
              //TODO: remove or correct permission to display button
              permission={"hidden"}
            >
              {t("button.create")}
            </Button>
          }
          rowKey="uuid"
          rowSelection={rowSelection}
          selectedItems={selectedRows}
          scroll={{ x: "max-content" }}
          columns={columns}
          dataSource={samples || []}
          loading={isFetching}
          onSearch={(value: string) => {
            debounced(value)
            resetPagination()
          }}
          onChange={onChangeTable}
          filterProperties={filterProperties(t)}
          setFilteringQuery={(payload: ObjectLiteral) => {
            setFilteringQuery(payload)
            resetPagination()
          }}
          pagination={{
            current: page,
            pageSize: perPage,
            total: meta?.total
          }}
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
        />
      </PageLayout>
      {modalId === ACTION.DELETE && <DeleteSamples onSuccess={onSuccess} onCancel={onCancel} selectedItems={selectedRows || []} open />}
    </ProtectedRoute>
  )
}

export default Page
