"use client"

import { ReactNode } from "react"

import { Layout, theme } from "antd"

import AppHeader from "@components/AppLayout/partials/AppHeader"
import AppNavigation from "@components/AppNavigation"
import { useInitBaseConfig } from "@root/hooks/useInitBaseConfig"
import { useRecursiveMenuNavigation } from "@root/hooks/useRecursiveMenuNavigation"
import { useStateMenu } from "@root/stores/menu/store"

import styles from "./styles.module.css"

const { Content } = Layout

type Props = {
  children: ReactNode
}

const AppLayout = ({ children }: Props) => {
  const {
    token: { colorBgLayout, colorBgBase }
  } = theme.useToken()

  const { collapsed, setCollapsed } = useStateMenu()

  const { items, pathname, defaultOpenKeys, flattenedChildren } = useRecursiveMenuNavigation()

  // use it to store base config
  useInitBaseConfig()

  const [menuItem] = items || []

  const onChange = () => {
    setCollapsed(!collapsed)
  }

  //--------------------------------------------------------------------------> Render

  return (
    <Layout
      style={{
        background: colorBgLayout
      }}
    >
      <Layout id="service-portal-layout" style={{ height: "100vh", background: colorBgBase }}>
        <AppHeader collapsed={collapsed} menu={menuItem} onChange={onChange} />
        <AppNavigation
          collapsed={collapsed}
          defaultOpenKeys={defaultOpenKeys}
          menuItems={flattenedChildren}
          pathname={pathname}
        />
        <Content
          className={styles.frame}
          style={{
            height: "100vh",
            overflow: "auto"
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
