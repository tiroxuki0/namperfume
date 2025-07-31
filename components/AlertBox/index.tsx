// components/AlertBox.tsx
import React from "react"

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from "@ant-design/icons"
import { Alert } from "antd"

export type AlertType = "success" | "info" | "warning" | "error"

interface AlertBoxProps {
  type?: AlertType
  message: React.ReactNode
  showIcon?: boolean
  iconOverride?: React.ReactNode
  style?: React.CSSProperties
  className?: string
  banner?: boolean
  closable?: boolean
  onClose?: () => void
}

const defaultIcons: Record<AlertType, React.ReactNode> = {
  success: <CheckCircleOutlined />,
  info: <InfoCircleOutlined />,
  warning: <ExclamationCircleOutlined />,
  error: <CloseCircleOutlined />
}

const AlertBox: React.FC<AlertBoxProps> = ({
  type = "info",
  message,
  showIcon = true,
  iconOverride,
  style,
  className,
  banner = false,
  closable = false,
  onClose
}) => {
  return (
    <Alert
      banner={banner}
      className={className}
      closable={closable}
      icon={iconOverride ?? defaultIcons[type]}
      message={message}
      showIcon={showIcon}
      style={{ borderRadius: 8, ...style }}
      type={type}
      onClose={onClose}
    />
  )
}

export default AlertBox
