import fs from "fs"
import path from "path"

import { execSync } from "child_process"

import chalk from "chalk"

import { getAllPages } from "./getAllPages.js"

export const createNewPage = newPages => {
  const allPages = getAllPages()
  console.log(chalk.green("allLanguages", allPages))

  for (const newPage of newPages) {
    if (allPages.includes(newPage)) {
      console.log(chalk.red(`newPage is ${newPage} already existed. Skipping...`))
      continue
    } else {
      console.log(chalk.red(`else is newPage is ${newPage} yet existed. creating...`))
      const filepath = path.resolve("./containers", newPage)
      fs.mkdirSync(filepath)
      console.log(chalk.yellow(`${newPage} folder is created!`))
      console.log(chalk.gray("Importing default Page: " + "Pages" + "...."))
      const defaultLanguagePath = path.resolve("./containers", "TemplatePage")

      console.log(chalk.red(defaultLanguagePath))

      const listRoot = `@containers/${newPages}`
      const createRoot = `@containers/${newPages}/Create`
      const detailRoot = `@containers/${newPages}/Detail`

      console.log(chalk.yellow(listRoot))

      const targetDir = path.resolve("./src/app/[locale]/(auth)/sample")
      const createTargetDir = path.resolve("./src/app/[locale]/(auth)/sample/new")
      const detailDir = path.resolve("./src/app/[locale]/(auth)/sample/[id]")

      fs.mkdirSync(createTargetDir, { recursive: true })
      fs.mkdirSync(detailDir, { recursive: true })

      const newListPath = path.join(targetDir, "page.tsx")
      const newCreatePath = path.join(createTargetDir, "page.tsx")
      const newDetailPath = path.join(detailDir, "page.tsx")

      const content = generateListPage(listRoot)
      const createContent = generateListPage(createRoot)
      const detailContent = generateListPage(detailRoot)

      fs.writeFileSync(newListPath, content, "utf8")
      fs.writeFileSync(newCreatePath, createContent, "utf8")
      fs.writeFileSync(newDetailPath, detailContent, "utf8")

      execSync(`cp -r ${defaultLanguagePath}/ ${path.resolve(filepath)}`)
    }
  }
}

function generateListPage(pName) {
  return `import React from 'react'
import { i18nNamespaces } from '@root/constant'
import TranslationsProvider from '@components/TranslationsProvider'
import dynamic from 'next/dynamic'
import initTranslations from '@root/src/app/i18n'

const DynamicPage = dynamic(() => import('${pName}'), {
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
`
}
