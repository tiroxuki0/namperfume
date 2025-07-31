"use client"
import { useCallback, useMemo, useState } from "react"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons"

import { Flex, Segmented, TableColumnsType, theme } from "antd"

import { useParams, useRouter } from "next/navigation"

import { useTranslation } from "react-i18next"

import Copy from "@components/Copy"
import CustomTable from "@components/CustomTable"
import ButtonDropdown from "@components/Dropdown/ButtonDropdown"
import GeneralDetails from "@components/GeneralDetails"
import Link from "@components/Link"
import PageLayout from "@components/PageLayout"
import ProtectedRoute from "@components/ProtectedShield"
import { Typography } from "@components/Typography"
import { ACTION } from "@root/constant"
import useChangeTable from "@root/hooks/useChangeTable"
import { useDebounceCallback } from "@root/hooks/useDebounce"
import { toLocalTime } from "@utils/helper"
import ROUTE from "@utils/pageRoutes"

import { SimpleItem } from "@models/entities/Base"

import DeleteSamples from "../components/modals/DeleteSamples"
import { TEMPLATE_DETAIL_TEST_ID } from "../data-testid"
import { useGetSample } from "../query/useGetSample"
import { useGetSamples } from "../query/useGetSamples"
import { ItemSegment, ItemTab } from "../types"

const Page = () => {
  const { id } = useParams()

  const { t } = useTranslation()

  const router = useRouter()
  const {
    token: { colorBgMask }
  } = theme.useToken()

  const onCancel = () => {
    setModalId(null)
  }

  const { sample, isPending } = useGetSample(id as string)

  const { page, perPage, onChangeTable, resetPagination } = useChangeTable<SimpleItem>()

  const [search, setSearch] = useState<string>("")

  const { samples, isFetching, meta } = useGetSamples({
    page,
    perPage,
    name: search
  })

  const debounced = useDebounceCallback(setSearch, 500)

  const [modalId, setModalId] = useState<string | null>(null)

  const [activeTab, setActiveTab] = useState<ItemTab>("tab_1")

  const handleBack = useCallback(() => {
    router.push(ROUTE.TEMPLATE.LIST)
  }, [router])

  const onDeleteSuccess = useCallback(() => {
    router.push(ROUTE.TEMPLATE.LIST)
  }, [router])

  const handleEdit = useCallback(() => {
    router.push(ROUTE.TEMPLATE.UPDATE(id as string))
  }, [router, id])

  const handleShowModalDelete = useCallback(() => {
    setModalId(ACTION.DELETE)
  }, [setModalId])

  const dropdownItems = useMemo(
    () => [
      {
        id: ACTION.EDIT,
        text: t("button.edit"),
        icon: <EditOutlined />,
        onClick: handleEdit
      },
      {
        id: ACTION.DELETE,
        text: t("button.delete"),
        icon: <DeleteOutlined />,
        danger: true,
        onClick: handleShowModalDelete
      }
    ],
    [t, handleEdit, handleShowModalDelete]
  )

  const itemsSegment = useMemo<ItemSegment[]>(
    () => [
      {
        label: "Tab 1",
        value: "tab_1"
      },
      {
        label: "Tab 2",
        value: "tab_2"
      }
    ],
    []
  )

  const columns: TableColumnsType<SimpleItem> = [
    {
      title: <Typography.TextWeight500>{t("title.name")}</Typography.TextWeight500>,
      render: (item: SimpleItem) => {
        return <Link href={`${ROUTE.TEMPLATE.DETAIL(item.uuid)}`}>{item.name}</Link>
      },
      sorter: (a, b) => a.name.localeCompare(b.name)
    }
  ]

  return (
    <ProtectedRoute>
      <PageLayout
        backIcon
        styles={{ body: { padding: 24 } }}
        title={sample?.name ?? ""}
        type="banner"
        breadcrumb={{
          items: [
            { title: t("examplePage.breadcrumb") },
            { title: <a href={ROUTE.TEMPLATE.LIST}>{t("examplePage.title")}</a> },
            { title: sample?.name || t("status.unknown") }
          ]
        }}
        extra={
          <ButtonDropdown
            data-testid={TEMPLATE_DETAIL_TEST_ID.ACTIONS_DROPDOWN}
            disabled={!sample}
            items={dropdownItems}
          >
            {t("button.actions")}
          </ButtonDropdown>
        }
        subTitle={
          <Flex align="center">
            <Typography.Text
              style={{ color: colorBgMask }}
            >{`${t("title.id")}: ${id ?? ""}`}</Typography.Text>
            <Copy value={(id as string) ?? ""} />
          </Flex>
        }
        onBack={handleBack}
      >
        <Flex vertical gap={24}>
          <GeneralDetails
            columns={2}
            loading={isPending}
            items={[
              {
                label: t("title.type"),
                value: sample?.type?.displayName ? sample.type.displayName : "-"
              },
              {
                label: t("title.createdAt"),
                value: sample?.createdAt ? toLocalTime(sample.createdAt) : "-"
              },
              {
                label: t("title.updatedAt"),
                value: sample?.updatedAt ? toLocalTime(sample.updatedAt) : "-"
              }
            ]}
          />
          <div>
            <Segmented
              options={itemsSegment}
              style={{ borderRadius: 14 }}
              value={activeTab}
              onChange={setActiveTab}
            />
            {/* content map */}
            <div style={{ marginTop: 20 }}>
              <CustomTable<SimpleItem>
                columns={columns}
                dataSource={samples || []}
                loading={isFetching}
                rowKey="uuid"
                scroll={{ x: "max-content" }}
                showFilter={false}
                pagination={{
                  current: page,
                  pageSize: perPage,
                  total: meta?.total
                }}
                onChange={onChangeTable}
                onSearch={(value: string) => {
                  debounced(value)
                  resetPagination()
                }}
              />
            </div>
          </div>
        </Flex>
      </PageLayout>

      {modalId === ACTION.DELETE && sample && (
        <DeleteSamples
          open
          selectedItems={[sample]}
          onCancel={onCancel}
          onSuccess={onDeleteSuccess}
        />
      )}
    </ProtectedRoute>
  )
}

export default Page
