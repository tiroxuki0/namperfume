import React, { ReactNode } from "react"

import { DropdownButtonProps } from "antd/es/dropdown"
import { MenuItemType } from "antd/es/menu/interface"
import { Space } from "antd"

import Dropdown from "@components/Dropdown"
import Button from "@components/Button"
import { usePermissions } from "@root/hooks/usePermissions"

type ButtonDropdownProps = Omit<DropdownButtonProps, "children" | "trigger" | "items"> & {
  children?: ReactNode
  items: (Omit<MenuItemType, "label" | "key"> & {
    text: string
    id: string
    permission?: string
    hide?: boolean
  })[]
  onItemClick?: (id: string) => void
}

const ButtonDropdown = (props: ButtonDropdownProps) => {
  const { children, items, onItemClick, ...rest } = props

  const { checkPermission } = usePermissions("")

  const itemsWithPermission = (items || []).filter(({ permission, hide }) => {
    return !hide && checkPermission?.(permission || "")
  })

  if (itemsWithPermission?.length === 0) return null

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        onClick: d => {
          onItemClick?.(d.key)
        },
        items: (itemsWithPermission || []).map(item => {
          const { id, text, ...rest } = item
          return {
            ...rest,
            label: text,
            key: id
          }
        })
      }}
      {...rest}
    >
      <Space.Compact>
        <Button>{children}</Button>
        <Button icon={<img src="/images/arrow.svg" />} />
      </Space.Compact>
    </Dropdown>
  )
}

export default ButtonDropdown
