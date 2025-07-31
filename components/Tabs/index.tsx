import { TabPaneProps, Tabs as AntTabs, TabsProps } from 'antd'
import type React from 'react'
import { usePermissions } from '@root/hooks/usePermissions'

interface Tab extends Omit<TabPaneProps, 'tab'> {
  key: string
  label: React.ReactNode
  permission?: string | boolean
}

interface SkyTabsProps extends Omit<TabsProps, 'items'> {
  items: Tab[]
}

const Tabs = (props: SkyTabsProps) => {
  const { items, ...rest } = props
  const { checkPermission } = usePermissions('')

  const filteredItems = (items || []).filter((item) => {
    if (item.permission && typeof item.permission === 'string') {
      return checkPermission(item.permission)
    }

    if (typeof item.permission === 'boolean') return item.permission

    return true
  })

  return <AntTabs {...rest} items={filteredItems} />
}

export default Tabs
