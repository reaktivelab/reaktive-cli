import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';
import {
  copyEslintFiles,
  modifyJsonScripts,
  supplyEslintPackages,
  PACKAGE_FILE,
  DEPENDENCY_FILE
} from '../../util';

const access = promisify(fs.access);

async function eslintEnable(options) {
  const { template = '' } = options;
  const toLowerCaseTemplate = template.toLowerCase();

  const packageFileUrl = path.resolve(
    options.targetDirectory,
    PACKAGE_FILE
  );
  const dependencyFileUrl = path.resolve(
    options.templateDirectory, `../eslint/${toLowerCaseTemplate}`,
    DEPENDENCY_FILE
  );

  try {
    await access(packageFileUrl, fs.constants.R_OK).then(() => {
      modifyJsonScripts(packageFileUrl);
      supplyEslintPackages(packageFileUrl, dependencyFileUrl);
      copyEslintFiles(options, toLowerCaseTemplate);
    });
  } catch (err) {
    console.log('%s Unable to supply ESLint!', chalk.red.bold('ERROR'));
    process.exit(1);
  }
}

module.exports = eslintEnable;
