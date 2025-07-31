import fs from "fs"
import path from "path"

import chalk from "chalk"

import { getAllLanguages } from "./getAllLanguages.js"

export const convertToCSV = async () => {
  try {
    const allLanguages = getAllLanguages()

    for (const language of allLanguages) {
      const langValuesPath = path.resolve("./locales", language, "values.js")
      const folderPath = path.resolve("./language-script/csv")
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true })
      }

      const destinationCSVPath = path.resolve("./language-script/csv", `${language}.csv`)

      if (fs.existsSync(destinationCSVPath)) {
        fs.unlinkSync(destinationCSVPath)
      }

      const module = await import(langValuesPath)

      const values = module.values

      for (const [key, value] of Object.entries(values)) {
        const content = key + "," + JSON.stringify(value)
        fs.appendFileSync(destinationCSVPath, content + "\n")
      }
      console.log(chalk.yellow(`Wrote to ${destinationCSVPath}!`))
    }
    console.log(chalk.bgGreen("Finished!"))
  } catch (error) {
    console.log(chalk.bgRed("Error"))
  }
}
