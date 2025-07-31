import {
  AppstoreOutlined,
  BellOutlined,
  // FileUnknownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons"
import ViewAllFeatures from "@components/AppLayout/partials/ViewAllFeatures"
import Button from "@components/Button"
import Divider from "@components/Divider"
import { useWindowSize } from "@root/hooks/useWindowSize"
import { useGetLogo } from "@root/queries/useGetLogo"
import { useGetProfiles } from "@root/queries/useGetProfiles"
import { useNotificationsStore } from "@root/stores/notification/store"
import ROUTE from "@utils/pageRoutes"
import { Badge, Flex, Space, Spin, theme, Typography } from "antd"
import { Header } from "antd/es/layout/layout"
import { ItemType } from "antd/es/menu/interface"
import { env } from "next-runtime-env"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import UserAvatar from "../UserAvatar"
import styles from "./style.module.css"

// const docsURL = env('NEXT_PUBLIC_DOCS_URL') || ''

const metaTitle = env("NEXT_PUBLIC_META_TITLE") || "Nextjs App"

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
      <Flex gap={12} align="center">
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
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onChange}
          style={{
            fontSize: "16px",
            color: colorBgContainer
          }}
        />

        <Divider className={styles.expandDivider} type="vertical" style={{ background: rest?.Menu?.darkItemSelectedBg }} />

        <Spin spinning={isFetching}>
          {!!logo?.url && (
            <Image
              width={80}
              height={80}
              src={logo?.url || ""}
              alt="logo"
              onClick={() => router.push(ROUTE.HOME)}
              className={styles.avatar}
              style={{
                display: status === "success" ? "block" : "none"
              }}
            />
          )}
        </Spin>

        <Divider type="vertical" style={{ background: rest?.Menu?.darkItemSelectedBg }} />

        {width > 900 && <Typography.Text style={{ color: colorBgContainer, margin: 0, fontWeight: 500, fontSize: 16 }}>{metaTitle}</Typography.Text>}

        <Button
          size="small"
          icon={<AppstoreOutlined />}
          onClick={() => onOpen(BulkActionTypes.VIEW)}
          style={{
            background: rest?.Menu?.darkItemSelectedBg,
            border: `1px solid ${rest?.Menu?.darkItemSelectedBg}`,
            color: colorBgContainer
          }}
        >
          {width > 800 && (
            <Space>
              All features
              <Image src="/images/customArrowDown.svg" alt="svg" width={8} height={8} />
            </Space>
          )}
        </Button>
      </Flex>
      <Space size="middle" align="center" className={styles.item}>
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
            <BellOutlined onClick={() => onOpen(BulkActionTypes.NOTIFY)} style={{ fontSize: 16, color: colorBgContainer }} />
          </Badge>
        )}

        {showAvatar && <Divider type="vertical" style={{ background: rest?.Menu?.darkItemSelectedBg }} />}

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
