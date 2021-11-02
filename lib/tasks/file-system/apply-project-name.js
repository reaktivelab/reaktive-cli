import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

import { promisify } from 'util';
import { modifyProjectName, PACKAGE_FILE } from '../../util';

const access = promisify(fs.access);

async function applyProjectName(options) {
  const packageFileUrl = path.resolve(
    options.targetDirectory,
    PACKAGE_FILE
  );

  try {
    await access(packageFileUrl, fs.constants.R_OK);
    modifyProjectName(packageFileUrl, options.nameInit);
  } catch (err) {
    console.log('%s Unable to apply the project name!', chalk.red.bold('ERROR'));
    process.exit(1);
  }
}

module.exports = applyProjectName;
