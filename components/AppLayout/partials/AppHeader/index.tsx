import { useState } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  AppstoreOutlined,
  BellOutlined,
  // FileUnknownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons"
import { Badge, Flex, Space, Spin, theme, Typography } from "antd"
import { Header } from "antd/es/layout/layout"
import { ItemType } from "antd/es/menu/interface"
import { env } from "next-runtime-env"

import ViewAllFeatures from "@components/AppLayout/partials/ViewAllFeatures"
import Button from "@components/Button"
import Divider from "@components/Divider"
import { useWindowSize } from "@root/hooks/useWindowSize"
import { useGetLogo } from "@root/queries/useGetLogo"
import { useGetProfiles } from "@root/queries/useGetProfiles"
import { useNotificationsStore } from "@root/stores/notification/store"
import ROUTE from "@utils/pageRoutes"

import UserAvatar from "../UserAvatar"

import styles from "./style.module.css"

// const docsURL = env('NEXT_PUBLIC_DOCS_URL') || ''

const metaTitle = env("NEXT_PUBLIC_META_TITLE") || "NextApp"

type BulkActionType = "notify" | "view"

const BulkActionTypes = {
  NOTIFY: "notify" as BulkActionType,
  VIEW: "view" as BulkActionType
}

const AppHeader = ({
  showNotification = true,
  showAvatar = true,
  onChange,
  collapsed,
  menu
}: {
  showNotification?: boolean
  showAvatar?: boolean
  onChange: () => void
  collapsed: boolean
  menu: ItemType
}) => {
  const {
    token: { colorBorderSecondary, lineType, colorBgContainer, ...rest }
  } = theme.useToken()

  const router = useRouter()

  const { logo, isFetching, status } = useGetLogo()

  // const handleDocsClick = () => {
  //   if (typeof window !== 'undefined') {
  //     window.open(docsURL, '_blank')
  //   }
  // }

  const { profile } = useGetProfiles()

  const { width } = useWindowSize()

  const menuLabel = menu && "label" in menu ? menu?.label : ""

  const [modalId, setModalId] = useState<string | null>(null)
  const { unreadNotificationCount } = useNotificationsStore()

  const onClose = () => setModalId(null)
  const onOpen = (id: string) => setModalId(id)

  //--------------------------------------------------------------------------> Render

  return (
    <Header
      className={styles.frame}
      style={{
        background: rest?.Menu?.darkItemBg,
        borderBottom: `1px ${lineType} ${colorBorderSecondary}`
      }}
    >
      <Flex align="center" gap={12}>
        {menuLabel && !collapsed && (
          <Typography.Text
            style={{
              color: colorBgContainer,
              margin: 0,
              fontWeight: 500,
              fontSize: 16,
              minWidth: 188,
              paddingLeft: 5
            }}
          >
            {menuLabel}
          </Typography.Text>
        )}
        <Button
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          type="text"
          style={{
            fontSize: "16px",
            color: colorBgContainer
          }}
          onClick={onChange}
        />

        <Divider
          className={styles.expandDivider}
          style={{ background: rest?.Menu?.darkItemSelectedBg }}
          type="vertical"
        />

        <Spin spinning={isFetching}>
          {!!logo?.url && (
            <Image
              alt="logo"
              className={styles.avatar}
              height={80}
              src={logo?.url || ""}
              width={80}
              style={{
                display: status === "success" ? "block" : "none"
              }}
              onClick={() => router.push(ROUTE.HOME)}
            />
          )}
        </Spin>

        <Divider style={{ background: rest?.Menu?.darkItemSelectedBg }} type="vertical" />

        {width > 900 && (
          <Typography.Text
            style={{ color: colorBgContainer, margin: 0, fontWeight: 500, fontSize: 16 }}
          >
            {metaTitle}
          </Typography.Text>
        )}

        <Button
          icon={<AppstoreOutlined />}
          size="small"
          style={{
            background: rest?.Menu?.darkItemSelectedBg,
            border: `1px solid ${rest?.Menu?.darkItemSelectedBg}`,
            color: colorBgContainer
          }}
          onClick={() => onOpen(BulkActionTypes.VIEW)}
        >
          {width > 800 && (
            <Space>
              All features
              <Image alt="svg" height={8} src="/images/customArrowDown.svg" width={8} />
            </Space>
          )}
        </Button>
      </Flex>
      <Space align="center" className={styles.item} size="middle">
        {/* <FileUnknownOutlined onClick={handleDocsClick} style={{ color: colorBgContainer }} /> */}
        {showNotification && (
          <Badge
            count={unreadNotificationCount}
            offset={[0, -8]}
            styles={{
              indicator: {
                boxShadow: "none"
              }
            }}
          >
            <BellOutlined
              style={{ fontSize: 16, color: colorBgContainer }}
              onClick={() => onOpen(BulkActionTypes.NOTIFY)}
            />
          </Badge>
        )}

        {showAvatar && (
          <Divider style={{ background: rest?.Menu?.darkItemSelectedBg }} type="vertical" />
        )}

        {showAvatar && (
          <UserAvatar
            username={profile?.user?.name}
            menuItems={[
              {
                key: "logout",
                url: "/saml/logout",
                text: "Logout"
              }
            ]}
          />
        )}
      </Space>

      {modalId === BulkActionTypes.VIEW && <ViewAllFeatures onClose={onClose} />}
    </Header>
  )
}

export default AppHeader
