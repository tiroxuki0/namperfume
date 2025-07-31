import { CloseCircleFilled } from '@ant-design/icons'
import AlertBox from '@components/AlertBox'
import Button from '@components/Button'
import ModalDialog from '@components/ModalDialog'
import { Typography } from '@components/Typography'
import { SimpleItem } from '@models/entities/Base'
import { ModalProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDeleteSample } from '../../mutation/useDeleteSample'
import PreviewCheck from '@components/PreviewCheck'

type DeleteModalProps = Pick<ModalProps, 'open' | 'loading'> & {
  selectedItems?: SimpleItem[]
  onSuccess?: () => void
  onCancel?: () => void
}

const DeleteSamples = ({ selectedItems, loading, onSuccess, onCancel, open }: DeleteModalProps) => {
  const { t } = useTranslation()

  const { isDeleting, remove } = useDeleteSample()

  const onConfirm = () => {
    if ((selectedItems || []).length === 0) return
    const uuids: string[] = (selectedItems || [])
      .map((provider) => provider.uuid)
      .filter(Boolean) as string[]

    remove(uuids, {
      onSuccess,
      onSettled: () => {
        onCancel?.()
      },
    })
  }

  return (
    <ModalDialog
      title={t('providersPage.detail.deleteTitle')}
      open={open}
      maskClosable={isDeleting}
      width={480}
      loading={loading || isDeleting}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t('button.cancel')}
        </Button>,
        <Button key="confirm" type="primary" danger onClick={onConfirm}>
          {t('button.delete')}
        </Button>,
      ]}
    >
      <>
        <AlertBox
          type="error"
          message={t('providersPage.detail.deleteMessage')}
          iconOverride={<CloseCircleFilled style={{ marginRight: '10px', marginLeft: '5px' }} />}
          style={{ marginBottom: '15px' }}
        />
        <Typography.Text>{t('providersPage.detail.deleteQuestion')}</Typography.Text>

        <PreviewCheck attributes={selectedItems || []} />
      </>
    </ModalDialog>
  )
}

export default DeleteSamples
