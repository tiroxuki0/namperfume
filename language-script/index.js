import chalk from 'chalk';
import { program } from 'commander';
import { convertToCSV } from "./convertToCSV.js";
import { createNewLanguage } from "./createNewLanguage.js";
import { createNewPage } from "./createNewPage.js";
import { migrate } from "./migrate.js";

program
  .version('1.0.0')

program
  .command('new-language')
  .description(
    'create new folder for customers and import english folder to that. Can be use with list of customers. E.g. -n abc xyz'
  )
  .argument('<language...>')
  .action(async(languages) => {
    try {
      console.log(chalk.blue('New language'));
      createNewLanguage(languages);
    } catch (error) {
      console.log(error);
    }
  });

program
  .command('new-page')
  .description(
    'create a new page'
  )
  .argument('<page...>')
  .action(async(pages) => {
    try {
      console.log(chalk.blue('New Page'));
      createNewPage(pages);
    } catch (error) {
      console.log(error);
    }
  });

program.command('migrate').action(() => {
  console.log(chalk.bgCyan('Migrate'));
  migrate();
  try {
  } catch (error) {
    console.log(chalk.red(error));
  }
});

program
  .command('js-to-csv')
  .action(() => {
    console.log(chalk.bgCyan('Convert to CSV'));
    convertToCSV()
  });

program.parse(process.argv);