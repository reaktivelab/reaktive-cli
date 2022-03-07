import path from 'path';

import {
    CONFIG_FILE,
    fileExists
} from '../../util';

export const readConfigFile = () => {
    const filePath = path.resolve(
        process.cwd(),
        CONFIG_FILE
      );

    if (!fileExists(filePath)) {
        return;
    }

    const configFile = require(filePath);
    const {
        name = '',
        git = false,
        eslint = false,
        manager = '',
        template = ''
    } = configFile;

    return {
        name,
        git,
        eslint,
        manager,
        template
    }
}

module.exports = readConfigFile;
