"use client"

import React from "react"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import type { MenuProps } from "antd"
import { Dropdown, Space } from "antd"
import { useTranslation } from "react-i18next"

import { Typography } from "@components/Typography"

import i18nConfig from "../../../../i18nConfig"

const Page = () => {
  const { i18n, t } = useTranslation()

  const items: MenuProps["items"] = [
    {
      key: "eng",
      label: <span>{t("select.eng")}</span>
    }
  ]

  const currentLocale = i18n.language
  const router = useRouter()
  const currentPathname = usePathname()

  const handleChange = (key: string) => {
    const newLocale = key

    if (
      currentLocale === i18nConfig.defaultLocale &&
      // @ts-expect-error: third-party library has incorrect types
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <Dropdown
      trigger={["click"]}
      menu={{
        items: items,
        onClick: ev => {
          handleChange(ev.key)
        }
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Space size="small">
          <Typography.Text>{t(`select.${currentLocale}`)}</Typography.Text>
          <Image
            alt="arrow"
            height={20}
            src={"/images/arrow.svg"}
            style={{ cursor: "pointer" }}
            width={20}
          />
        </Space>
      </div>
    </Dropdown>
  )
}

export default Page
