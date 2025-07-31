import { notification } from "antd/lib"

type NotificationType = "success" | "info" | "warning" | "error"

interface NotifyOptions {
  type?: NotificationType
  message: string
  description?: string
  duration?: number
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
  onClose?: () => void
  key?: string // optional key for closing manually
}

/**
 * Global Notification Utility
 */
export const notify = ({
  type = "info",
  message,
  description,
  duration = 3,
  placement = "bottomLeft",
  onClose,
  key
}: NotifyOptions) => {
  notification[type]({
    message,
    description,
    duration,
    placement,
    onClose,
    key
  })
}
