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

const copy = promisify(ncp);

export const copyEslintFiles = (options) => {
    const url = path.resolve(options.templateDirectory, '../eslint');

    copy(url, options.targetDirectory, {
        filter: /^(?!.*dependencies).*/
    });
};

export const supplyEslintPackages = (filePath, dependencyPath, template) => {
    const file = require(filePath);
    const dependencyFileTypeScript = require(dependencyPath);

    if (template.toLowerCase() !== TS) {
        return;
    }

    if (file['devDependencies']) {
        for (const [key, value] of Object.entries(dependencyFileTypeScript)) {
            file['devDependencies'][key] = value;
        }

        fs.promises
            .writeFile(PACKAGE_FILE, JSON.stringify(file, null, 2))
            .catch((err) => {
                console.log(err);
            });
    }
};

export const modifyJsonScripts = (filePath) => {
    const file = require(filePath);

    file.scripts['eslint'] = ESLINT_SCRIPT;
    file.scripts['eslint:fix'] = ESLINT_SCRIPT_FIX;
    file.scripts['stylelint'] = STYLELINT_SCRIPT;
    file.scripts['stylelint:fix'] = STYLELINT_SCRIPT_FIX;

    fs.promises
        .writeFile(PACKAGE_FILE, JSON.stringify(file, null, 2))
        .catch((err) => {
            console.log(err);
        });
};

export const modifyProjectName = (filePath, projectName) => {
    const file = require(filePath);

    file.name = projectName;

    fs.promises
        .writeFile(PACKAGE_FILE, JSON.stringify(file, null, 2))
        .catch((err) => {
            console.log(err);
        });
};
