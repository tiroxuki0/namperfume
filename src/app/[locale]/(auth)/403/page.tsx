import React from "react"

import dynamic from "next/dynamic"

import { i18nNamespaces } from "@root/constant"
import TranslationsProvider from "@components/TranslationsProvider"
import initTranslations from "@app/i18n"

const DynamicPage = dynamic(() => import("@containers/UnauthorizationPage"), {
  ssr: false
})

export default async function Page(props: { params: { locale: string } }) {
  const { params } = props
  const { locale } = params

  const { resources } = await initTranslations(locale, i18nNamespaces)

  //--------------------------------------------------------------------------> Render

  return (
    <TranslationsProvider locale={locale} namespaces={i18nNamespaces} resources={resources}>
      <DynamicPage />
    </TranslationsProvider>
  )
}
