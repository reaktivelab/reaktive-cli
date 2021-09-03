import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';
import {
    TEMPLATE_PATH,
    modifyJsonTestScript,
    modifyProjectNameScript
} from '../util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
   return copy(options.templateDirectory, options.targetDirectory, {
       clobber: false
   });
}

async function initGit(options) {
    const result = await execa('git', ['init'], {
        cwd: options.targetDirectory
    });

    if (result.failed) {
        return Promise.reject(new Error('Failed to initialize Git!'));
    }

    return;
}

async function eslintEnable(options) {
    const packageFileUrl = path.resolve(
        options.targetDirectory,
        'package.json'
    );

    try {
        await access(packageFileUrl, fs.constants.R_OK);
        modifyJsonTestScript(packageFileUrl);

    } catch (err) {
        console.log('%s Unable to supply ESLint!', chalk.red.bold('ERROR'));
        process.exit(1);
    }
}

async function applyProjectName(options) {
    const packageFileUrl = path.resolve(
        options.targetDirectory,
        'package.json'
    );

    try {
        await access(packageFileUrl, fs.constants.R_OK);
        modifyProjectNameScript(packageFileUrl, options.nameInit);

    } catch (err) {
        console.log('%s Unable to apply the project name!', chalk.red.bold('ERROR'));
        process.exit(1);
    }
}

export async function createProject(options) {
    options = {
        ...options,
        targetDirectory: options.targetDirectory || process.cwd()
    }

    const currentFileUrl = import.meta.url;
    const templateDir = path.resolve(
        new URL(currentFileUrl).pathname,
        TEMPLATE_PATH,
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
            title: 'Copy project files',
            task: () => copyTemplateFiles(options)
        },
        {
            title: 'Apply the project name',
            task: () => applyProjectName(options)
        },
        {
            title: 'Initialize Git',
            task: () => initGit(options),
            enabled: () => options.git
        },
        {
            title: 'Install dependancies',
            task: () => projectInstall({
                cwd: options.targetDirectory,
                prefer: options.yarn ? 'yarn' : 'npm'
            }),
            skip: () => !options.runInstall ? 'Pass --install to automatically install' : undefined
        },
        {
            title: 'Supply eslint',
            task: () => eslintEnable(options),
            skip: () => !options.lintInit ? 'Pass --lint to automatically install' : undefined
        }
    ]);

    await tasks.run();

    console.log('%s Project ready 🚀', chalk.green.bold('DONE'));
    return true;
}
