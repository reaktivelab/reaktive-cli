import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import { TEMPLATES_PATH } from '../util';

/**
 * Import tasks
 */
const initGit = require('./git/init-git');
const copyTemplateFiles = require('./file-system/copy-template-files');
const eslintEnable = require('./lint/eslint');
const applyProjectName = require('./file-system/apply-project-name');
const createReaktiveConfig = require('./file-system/create-reaktive-config');
const startProject = require('./runners/start-project');
const runLintingScripts = require('./runners/linting-scripts');

const access = promisify(fs.access);

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    TEMPLATES_PATH,
    options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.log('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copying template files',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Applying the project name',
      task: () => applyProjectName(options)
    },
    {
      title: 'Initializing Git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Supplying eslint',
      task: () => eslintEnable(options),
      skip: () => (!options.lintInit ? 'Pass --lint to automatically install' : undefined)
    },
    {
      title: 'Installing dependencies',
      task: () => projectInstall({
        cwd: options.targetDirectory,
        prefer: options.yarn ? 'yarn' : 'npm'
      }),
      skip: () => (!options.runInstall ? 'Pass --install to automatically install' : undefined)
    },
    {
      title: 'Linting files',
      task: () => runLintingScripts(),
      enabled: () => options.lintInit
    },
    {
      title: 'Creating config file',
      task: () => createReaktiveConfig(options)
    },
    {
      title: 'Starting the project',
      task: () => startProject(options.yarn ? 'yarn' : 'npm'),
      enabled: () => options.open
    }
  ]);

  await tasks.run();

  console.log('%s Project ready 🚀', chalk.green.bold('DONE'));
  return true;
}
