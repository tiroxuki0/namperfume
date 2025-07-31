import React from "react"

import { Button as AntdButton, ButtonProps } from "antd"

import { usePermissions } from "@root/hooks/usePermissions"

export interface _ButtonProps extends ButtonProps {
  permission?: string | string[]
}

const Button = (props: _ButtonProps) => {
  const { children, permission, ...rest } = props

  const { checkPermission } = usePermissions("")

  const isAllowed = checkPermission(permission || "")

  if (!isAllowed) {
    return null
  }

  return <AntdButton {...rest}>{children}</AntdButton>
}

export default Button
