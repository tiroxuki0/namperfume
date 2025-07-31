"use client"

import React from "react"
import { Layout, Menu, theme } from "antd"
import { useRouter } from "next/navigation"
import { ItemType } from "antd/es/menu/interface"

const { Sider } = Layout

interface Props {
  menuItems: ItemType[]
  collapsed?: boolean
  pathname: string
  defaultOpenKeys: string[]
}

const AppNavigation = ({ pathname, defaultOpenKeys, collapsed, menuItems }: Props) => {
  const {
    token: { colorBorderSecondary, lineType }
  } = theme.useToken()

  const { push } = useRouter()

  //--------------------------------------------------------------------------> render

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={256}
      style={{
        ...(collapsed && {
          display: "none"
        }),
        background: "#262626",
        borderRight: `1px ${lineType} ${colorBorderSecondary}`,
        zIndex: 1
      }}
    >
      <Menu
        defaultOpenKeys={defaultOpenKeys}
        defaultSelectedKeys={[pathname]}
        key={pathname}
        items={menuItems!}
        mode="inline"
        theme="dark"
        onClick={(menu) => {
          push(menu?.key || "")
        }}
        style={{
          top: 68,
          position: "absolute"
        }}
      />
    </Sider>
  )
}

export default AppNavigation
