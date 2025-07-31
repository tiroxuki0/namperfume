import Flex from '@components/Flex'
import { Alert, Button, Space, Typography } from 'antd'
import ModalDialog from '@components/ModalDialog'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onCancel: () => void
  onDiscard: () => void
}
const DiscardPrompt = ({ onCancel, onDiscard }: Props) => {
  const { t } = useTranslation()

  return (
    <ModalDialog
      footer={[
        <Space key="new-theme-dialog">
          <Button data-testid="modal-discard-button-cancel" onClick={onCancel}>
            {t('button.cancel')}
          </Button>
          <Button data-testid="modal-discard-button-discard" onClick={onDiscard} type="primary">
            {t('button.discard')}
          </Button>
        </Space>,
      ]}
      open
      title={t('providersPage.create.modal.discard.title')}
      onCancel={onCancel}
    >
      <Flex vertical gap={12}>
        <Alert type="warning" message={t('providersPage.create.modal.discard.warning')} showIcon />

        <Typography.Text>{t('providersPage.create.modal.discard.areYouSure')}</Typography.Text>
      </Flex>
    </ModalDialog>
  )
}

export default DiscardPrompt
