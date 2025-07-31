import fs from "fs"
import path from "path"

import { execSync } from "child_process"

import chalk from "chalk"

import { getAllLanguages } from "./getAllLanguages.js"

function customStringify(obj, depth = 0) {
  const indent = "  ".repeat(depth)

  return Object.entries(obj)
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        const nested = customStringify(value, depth + 1)
        return `${indent}${key}: {\n${nested}${indent}}`
      } else {
        return `${indent}${key}: ${JSON.stringify(value)}`
      }
    })
    .join(",\n")
}

const writeToLangValueFile = (langPath, langValues) => {
  console.log(chalk.gray(`Writing to ${langPath}...`))
  fs.writeFileSync(langPath, "exports.values = {\n")
  const content = customStringify(langValues)
  fs.appendFileSync(langPath, `${content}\n`)
  fs.appendFileSync(langPath, "}")
  console.log(chalk.green(`Wrote to ${langPath}`))
}

const getAllSubLang = () => {
  const folderPath = path.resolve("./locales")
  const filenames = fs.readdirSync(folderPath)
  console.log(
    chalk.cyan(
      "filenames",
      filenames,
      "filenamesMapping",
      filenames.map(fn => path.join(folderPath, fn))
    )
  )
  return filenames.map(fn => path.join(folderPath, fn))
}

const overwriteTranslationFiles = (defaultLanguageFolderPath, language) => {
  for (const folder of getAllSubLang(language)) {
    console.log("folder", folder)
    execSync(`rsync -aP --exclude=values.js /${defaultLanguageFolderPath}/ /${folder}/`)
    console.log(chalk.yellow(`Copied to ${folder}`))
  }
}

const compareAndUpdateValueFile = async (language, defaultValues) => {
  const folderPath = path.resolve("./locales", language)
  const filenames = fs.readdirSync(folderPath)
  const langPath = path.resolve("./locales", language, "values.js")

  // @ts-expect-error - legacy systems
  const module = await import(langPath)

  const langValues = module.values

  console.log(chalk.yellow("folderPath", folderPath, "filenames", typeof filenames))
  console.log(chalk.gray("Comparing", langPath, "langValues", langValues))

  const addCount = []

  for (const key in defaultValues) {
    if (!langValues.hasOwnProperty(key)) {
      langValues[key] = defaultValues[key]
      addCount.push([key, defaultValues[key]])
    } else {
      if ((langValues[key] === "" && defaultValues[key] !== "") || language === "en") {
        langValues[key] = defaultValues[key]
        addCount.push([key, defaultValues[key]])
      }
    }
  }

  console.log(chalk.yellow(`Added ${addCount.length} keys`, ...addCount))

  if (addCount.length > 0) {
    const missingFolderPath = path.resolve("./language-script/missing")
    if (!fs.existsSync(missingFolderPath)) {
      fs.mkdirSync(missingFolderPath, { recursive: true })
    }

    const missingPath = path.resolve(
      "./language-script/missing",
      `${language}-${Date.now().toString()}.txt`
    )
    if (fs.existsSync(missingPath)) {
      fs.unlinkSync(missingPath)
    }

    for (const [key, value] of addCount) {
      const content = key + "," + JSON.stringify(value)
      fs.appendFileSync(missingPath, content + "\n")
    }
    console.log(chalk.yellow(`Wrote all missing keys to file: `), missingPath)
  }

  const deleteCount = []
  for (const k in langValues) {
    if (!defaultValues.hasOwnProperty(k)) {
      delete langValues[k]
      deleteCount.push(k)
    }
  }
  console.log(chalk.yellow(`Deleted ${deleteCount.length} keys`))
  for (const k of deleteCount) {
    console.log(k)
  }
  if (addCount.length === 0 && deleteCount.length === 0) {
    console.log(chalk.gray("No change. Skipping file..."))
    return
  }

  writeToLangValueFile(langPath, langValues)
}

export const migrate = async () => {
  try {
    const defaultLanguageFolderPath = path.resolve("./locales", "eng")
    const defaultLanguagePath = path.join(defaultLanguageFolderPath, "values.js")

    const allLanguages = getAllLanguages()

    console.log(chalk.green(`${allLanguages}. allLanguages...`))

    // @ts-expect-error - legacy systems
    const module = await import(defaultLanguagePath)

    const defaultValues = module.values

    console.log(chalk.red(`${defaultLanguagePath}. defaultLanguagePath...`))

    console.log(chalk.bgGreen(`${typeof defaultValues}. defaultValues...`))

    for (const language of allLanguages) {
      if (language === "eng") continue
      console.log(chalk.magenta(`language: ${language}`))
      console.log(chalk.cyan("compare and update all values files"))
      console.log(chalk.cyan("defaultValues: ", defaultValues))

      await compareAndUpdateValueFile(language, defaultValues)
      console.log(chalk.cyan("Overwrite the rest to take the latest"))
      overwriteTranslationFiles(defaultLanguageFolderPath, language)
      console.log("-----------------")
    }
  } catch (error) {
    console.log(error)
  }
}
