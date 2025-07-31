import chalk from 'chalk';
import { getAllLanguages } from "./getAllLanguages.js"
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export const createNewLanguage = (languages) => {
  const allLanguages = getAllLanguages();

  console.log(chalk.green('allLanguages', languages));

  for (const language of languages) {
    if(allLanguages.includes(language)) {
      console.log(chalk.red(`${language} already existed. Skipping...`));
      continue;
    } else {
      const filepath = path.resolve("./locales", language);
      fs.mkdirSync(filepath);
      console.log(chalk.yellow(`${language} folder is created!`));
      console.log(
        chalk.gray('Importing default language: ' + "eng" + '....')
      );
      const defaultLanguagePath = path.resolve(
        "./locales",
        "eng",
      );

      execSync(
        `cp -r ${defaultLanguagePath}/ ${path.resolve(
          filepath,
        )}`
      );
    }

  }
}