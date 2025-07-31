import React from 'react'
import { i18nNamespaces } from '@root/constant'
import TranslationsProvider from '@components/TranslationsProvider'
import dynamic from 'next/dynamic'
import initTranslations from '@root/src/app/i18n'

const DynamicPage = dynamic(() => import('@containers/TemplatePage/Detail'), {
  ssr: false,
})

export default async function Page(props: { params: { locale: string } }) {
  const { params } = props
  const { locale } = params

  const { resources } = await initTranslations(locale, i18nNamespaces)

  //--------------------------------------------------------------------------> Render

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <DynamicPage />
    </TranslationsProvider>
  )
}
