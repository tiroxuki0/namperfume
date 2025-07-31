"use client"

import React, { useState } from "react"

import { useRouter } from "next/navigation"
import { LogoutOutlined } from "@ant-design/icons"
import { Modal, Space, theme } from "antd"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { env } from "next-runtime-env"

import { Typography } from "@components/Typography"
import { getLogoutUrl } from "@utils/request/request"

const homePageUrl = env("NEXT_PUBLIC_EXTERNAL_CMS_URL") || ""

interface Props {
  onClose: () => void
}

const LogoutPrompt = ({ onClose }: Props) => {
  const queryClient = useQueryClient()

  const [loading, setLoading] = useState<boolean>(false)

  const { t } = useTranslation()

  const {
    token: { colorPrimary }
  } = theme.useToken()
  const router = useRouter()

  const onLogout = async () => {
    setLoading(true)

    try {
      // homePageUrl is defined for callback variable named RelayState
      //  it will be handled in filed located as src/api/v1/saml/acs
      const res = await getLogoutUrl(homePageUrl)
      if (!!res.sloUrl) {
        queryClient.removeQueries()
        router.push(res.sloUrl)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  //--------------------------------------------------------------------------> Render

  return (
    <Modal
      open
      okText={t("button.confirm")}
      okButtonProps={{
        loading: loading
      }}
      title={
        <Space>
          <LogoutOutlined style={{ color: colorPrimary }} />
          <Typography.Text>{t("usersPage.modal.logout.title")}</Typography.Text>
        </Space>
      }
      onCancel={onClose}
      onOk={() => onLogout()}
    >
      <Typography.Text>{t("usersPage.modal.logout.areYouSure")}</Typography.Text>
    </Modal>
  )
}

export default LogoutPrompt
