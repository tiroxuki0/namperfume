// components/AlertBox.tsx
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { Alert } from 'antd'
import React from 'react'

export type AlertType = 'success' | 'info' | 'warning' | 'error'

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
  error: <CloseCircleOutlined />,
}

const AlertBox: React.FC<AlertBoxProps> = ({
  type = 'info',
  message,
  showIcon = true,
  iconOverride,
  style,
  className,
  banner = false,
  closable = false,
  onClose,
}) => {
  return (
    <Alert
      type={type}
      message={message}
      showIcon={showIcon}
      icon={iconOverride ?? defaultIcons[type]}
      style={{ borderRadius: 8, ...style }}
      className={className}
      banner={banner}
      closable={closable}
      onClose={onClose}
    />
  )
}

export default AlertBox
