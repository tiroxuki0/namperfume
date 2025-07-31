import React from "react"

import { Alert, Button, Space, Typography } from "antd"

import { useTranslation } from "react-i18next"

import Flex from "@components/Flex"
import ModalDialog from "@components/ModalDialog"

interface Props {
  onCancel: () => void
  onDiscard: () => void
}
const DiscardPrompt = ({ onCancel, onDiscard }: Props) => {
  const { t } = useTranslation()

  return (
    <ModalDialog
      open
      title={t("providersPage.create.modal.discard.title")}
      footer={[
        <Space key="new-theme-dialog">
          <Button data-testid="modal-discard-button-cancel" onClick={onCancel}>
            {t("button.cancel")}
          </Button>
          <Button data-testid="modal-discard-button-discard" type="primary" onClick={onDiscard}>
            {t("button.discard")}
          </Button>
        </Space>
      ]}
      onCancel={onCancel}
    >
      <Flex vertical gap={12}>
        <Alert showIcon message={t("providersPage.create.modal.discard.warning")} type="warning" />

        <Typography.Text>{t("providersPage.create.modal.discard.areYouSure")}</Typography.Text>
      </Flex>
    </ModalDialog>
  )
}

export default DiscardPrompt
