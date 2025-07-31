import { CloseCircleFilled } from "@ant-design/icons"

import { ModalProps } from "antd"

import { useTranslation } from "react-i18next"

import AlertBox from "@components/AlertBox"
import Button from "@components/Button"
import ModalDialog from "@components/ModalDialog"
import { Typography } from "@components/Typography"
import { SimpleItem } from "@models/entities/Base"

import PreviewCheck from "@components/PreviewCheck"

import { useDeleteSample } from "../../mutation/useDeleteSample"

type DeleteModalProps = Pick<ModalProps, "open" | "loading"> & {
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
      .map(provider => provider.uuid)
      .filter(Boolean) as string[]

    remove(uuids, {
      onSuccess,
      onSettled: () => {
        onCancel?.()
      }
    })
  }

  return (
    <ModalDialog
      loading={loading || isDeleting}
      maskClosable={isDeleting}
      open={open}
      title={t("providersPage.detail.deleteTitle")}
      width={480}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t("button.cancel")}
        </Button>,
        <Button danger key="confirm" type="primary" onClick={onConfirm}>
          {t("button.delete")}
        </Button>
      ]}
      onCancel={onCancel}
    >
      <>
        <AlertBox
          iconOverride={<CloseCircleFilled style={{ marginRight: "10px", marginLeft: "5px" }} />}
          message={t("providersPage.detail.deleteMessage")}
          style={{ marginBottom: "15px" }}
          type="error"
        />
        <Typography.Text>{t("providersPage.detail.deleteQuestion")}</Typography.Text>

        <PreviewCheck attributes={selectedItems || []} />
      </>
    </ModalDialog>
  )
}

export default DeleteSamples
