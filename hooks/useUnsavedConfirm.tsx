import React from "react"

import { Modal, Typography } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"

const { Text } = Typography

export const useUnsavedConfirm = (t: (key: string) => string) => {
  const confirmDiscard = (): Promise<boolean> => {
    return new Promise(resolve => {
      Modal.confirm({
        title: (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ExclamationCircleOutlined style={{ color: "#faad14", fontSize: 20 }} />
            <span>{t("notify.unsaved.title")}</span>
          </div>
        ),
        icon: null,
        content: <Text type="secondary">{t("notify.unsaved.description")}</Text>,
        okText: t("button.discard"),
        cancelText: t("button.cancel"),
        okType: "danger",
        centered: true,
        onOk: () => resolve(true),
        onCancel: () => resolve(false)
      })
    })
  }
  return { confirmDiscard }
}
