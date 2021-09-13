import arg from 'arg';
import inquirer from 'inquirer';
import path from 'path';
import chalk from 'chalk';
import { createProject } from '../tasks/main';

function parseArgumentsIntoOptions(rawArgs) {
    try {
        const args = arg(
            {
                '--git': Boolean,
                '--yes': Boolean,
                '--install': Boolean,
                '--lint': Boolean,
                '--name': String,
                '--open': Boolean,
                '--use-yarn': Boolean,
                '-g': '--git',
                '-y': '--yes',
                '-i': '--install',
                '-l': '--lint',
                '-n': '--name',
                '-o': '--open'
            },
            {
                argv: rawArgs.slice(2),
            }
        );
        return {
            skipPrompts: args['--yes'] || false,
            git: args['--git'] || false,
            template: args._[0],
            runInstall: args['--install'] || false,
            lintInit: args['--lint'] || false,
            nameInit: args['--name'] || '',
            open: args['--open'] || false,
            yarn: args['--use-yarn'] || false
        };
    } catch (err) {
        if (err.code === 'ARG_UNKNOWN_OPTION') {
            console.log('%s Unknown argument! Use --help to see the list of available command options', chalk.red.bold('ERROR'));
        } else {
            throw err;
        }
    }
}

async function promptForMissingOptions(options) {
    const defaultTemplate = 'JavaScript';

    if (options.skipPrompts) {
        return {
            ...options,
            template: options.template || defaultTemplate
        }
    }

    const questions = [];
    if (!options.template) {
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project template to use',
            choices: ['JavaScript', 'TypeScript'],
            default: defaultTemplate
        });
    }

    if(!options.nameInit) {
        questions.push({
            type: 'input',
            name: 'nameInit',
            message: 'Project name',
            default: path.basename(process.cwd())
        });
    }

    if (!options.git) {
        questions.push({
            type: 'confirm',
            name: 'git',
            message: 'Initialize a git repo?',
            default: false
        });
    }

    if(!options.lintInit) {
        questions.push({
            type: 'confirm',
            name: 'lintInit',
            message: 'Would you like to supply ESLint?',
            default: false
        });
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        template: options.template || answers.template,
        git: options.git || answers.git,
        lintInit: options.lintInit || answers.lintInit,
        nameInit: options.nameInit || answers.nameInit,
        open: options.open || false,
        yarn: options.yarn || false
    }
}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);

    if (options) {
        options = await promptForMissingOptions(options);

        await createProject(options);
    }
}
