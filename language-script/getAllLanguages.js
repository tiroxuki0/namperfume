import fs from "fs"

export const getAllLanguages = () => {
  const filenames = fs.readdirSync("./locales")
  return filenames
}
