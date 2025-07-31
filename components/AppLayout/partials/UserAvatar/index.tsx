"use client"

import React, { useState } from "react"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Avatar, Dropdown, theme } from "antd"

import { Typography } from "@components/Typography"
import ROUTE from "@utils/pageRoutes"

import styles from "./style.module.css"
import LogoutPrompt from "./LogoutPrompt"

type UserBulkActionType = "profile" | "logout"

const UserBulkAction = {
  ManageProfile: "profile" as UserBulkActionType,
  Logout: "logout" as UserBulkActionType
}

const App = ({
  username,
  menuItems
}: {
  username?: string
  menuItems?: { key: string; text: string; url: string }[]
}) => {
  const {
    token: { colorBgContainer, colorPrimaryBg, geekblue }
  } = theme.useToken()
  const [action, setAction] = useState<string | null>(null)

  const router = useRouter()

  const onClick = (item: { key: string; text: string; url: string }) => {
    if (item.key === UserBulkAction.Logout) {
      setAction(item?.key)
      return
    }
    router.push(ROUTE.PROFILE.LIST)
  }

  const onClose = () => setAction(null)

  const avatar = (username || []).slice(0, 1)

  //--------------------------------------------------------------------------> Render

  return (
    <>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: (menuItems || []).map(item => ({
            key: item?.key,
            label: item?.text,
            href: item?.url,
            onClick: () => onClick(item)
          }))
        }}
      >
        <div className={styles.frame}>
          <Avatar
            shape="square"
            style={{ backgroundColor: colorPrimaryBg, color: geekblue, textTransform: "uppercase" }}
          >
            {avatar}
          </Avatar>

          <div className={styles.item}>
            <Typography.Text style={{ color: colorBgContainer }}>{username}</Typography.Text>
          </div>

          <Image alt="svg" height={8} src="/images/customArrowDown.svg" width={8} />
        </div>
      </Dropdown>

      {action === UserBulkAction.Logout && <LogoutPrompt onClose={onClose} />}
    </>
  )
}

export default App
