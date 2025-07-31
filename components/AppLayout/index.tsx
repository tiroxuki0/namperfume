'use client'

import AppHeader from '@components/AppLayout/partials/AppHeader'
import AppNavigation from '@components/AppNavigation'
import { useInitBaseConfig } from '@root/hooks/useInitBaseConfig'
import { useRecursiveMenuNavigation } from '@root/hooks/useRecursiveMenuNavigation'
import { useStateMenu } from '@root/stores/menu/store'
import { Layout, theme } from 'antd'
import { ReactNode } from 'react'
import styles from './styles.module.css'

const { Content } = Layout

type Props = {
  children: ReactNode
}

const AppLayout = ({ children }: Props) => {
  const {
    token: { colorBgLayout, colorBgBase },
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
        background: colorBgLayout,
      }}
    >
      <Layout id="service-portal-layout" style={{ height: '100vh', background: colorBgBase }}>
        <AppHeader menu={menuItem} collapsed={collapsed} onChange={onChange} />
        <AppNavigation
          pathname={pathname}
          defaultOpenKeys={defaultOpenKeys}
          menuItems={flattenedChildren}
          collapsed={collapsed}
        />
        <Content
          className={styles.frame}
          style={{
            height: '100vh',
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
