import fs from 'fs';
import { promisify } from 'util';
import ncp from 'ncp';
import path from 'path';
import {
  PACKAGE_FILE,
  ESLINT_SCRIPT,
  ESLINT_SCRIPT_FIX,
  STYLELINT_SCRIPT,
  STYLELINT_SCRIPT_FIX,
  TS
} from './constants';
import fileExists from './system';

const copy = promisify(ncp);

const writeReadableJSONFile = (file) => {
  fs.promises
    .writeFile(PACKAGE_FILE, JSON.stringify(file, null, 2))
    .catch((err) => {
      console.error(err);
    });
};

export const copyEslintFiles = (options, template = '') => {
  const url = path.resolve(options.templateDirectory, `../eslint/${template}`);

  copy(url, options.targetDirectory, {
    filter: /^(?!.*dependencies).*/
  });
};

export const supplyEslintPackages = (filePath, dependencyPath) => {
  if (!fileExists(filePath)) {
    return;
  }

  const file = require(filePath);
  const dependencyFileTypeScript = require(dependencyPath);

  if (file.devDependencies) {
    for (const [key, value] of Object.entries(dependencyFileTypeScript)) {
      file.devDependencies[key] = value;
    }

    writeReadableJSONFile(file);
  }
};

export const modifyJsonScripts = (filePath) => {
  if (!fileExists(filePath)) {
    return;
  }

  const file = require(filePath);
  file.scripts.eslint = ESLINT_SCRIPT;
  file.scripts['eslint:fix'] = ESLINT_SCRIPT_FIX;
  file.scripts.stylelint = STYLELINT_SCRIPT;
  file.scripts['stylelint:fix'] = STYLELINT_SCRIPT_FIX;

  writeReadableJSONFile(file);
};

export const modifyProjectName = (filePath, projectName) => {
  if (!fileExists(filePath)) {
    return;
  }

  const file = require(filePath);
  file.name = projectName;

  writeReadableJSONFile(file);
};
