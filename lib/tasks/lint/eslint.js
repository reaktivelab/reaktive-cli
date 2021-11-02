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
  const packageFileUrl = path.resolve(
    options.targetDirectory,
    PACKAGE_FILE
  );
  const dependencyFileUrl = path.resolve(
    options.templateDirectory, `../eslint/${template}`,
    DEPENDENCY_FILE
  );

  try {
    await access(packageFileUrl, fs.constants.R_OK).then(() => {
      modifyJsonScripts(packageFileUrl);
      supplyEslintPackages(packageFileUrl, dependencyFileUrl, template);
      copyEslintFiles(options, template);
    });
  } catch (err) {
    console.log('%s Unable to supply ESLint!', chalk.red.bold('ERROR'));
    process.exit(1);
  }
}

module.exports = eslintEnable;
