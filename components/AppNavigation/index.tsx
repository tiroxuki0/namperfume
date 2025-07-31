"use client"

import React from "react"

import { useRouter } from "next/navigation"
import { Layout, Menu, theme } from "antd"
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
      collapsible
      collapsed={collapsed}
      trigger={null}
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
        items={menuItems!}
        key={pathname}
        mode="inline"
        theme="dark"
        style={{
          top: 68,
          position: "absolute"
        }}
        onClick={menu => {
          push(menu?.key || "")
        }}
      />
    </Sider>
  )
}

export default AppNavigation
