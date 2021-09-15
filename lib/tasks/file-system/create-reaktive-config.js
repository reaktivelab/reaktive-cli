import chalk from 'chalk';
import { CONFIG_FILE } from '../../util';

const fs = require('fs').promises;

async function createReaktiveConfig(options = {}) {
  const {
    nameInit = '',
    template = '',
    git = false,
    lintInit = false,
    yarn = false
  } = options;

  const manager = yarn ? 'yarn' : 'npm';

  const data = {
    name: nameInit,
    git,
    eslint: lintInit,
    manager,
    template: template.toLowerCase()
  };

  await fs.writeFile(CONFIG_FILE, JSON.stringify(data, null, 2))
    .catch(() => {
      console.log('%s Unable to create a Reaktive CLI config file!', chalk.red.bold('ERROR'));
      process.exit(1);
    });
}

module.exports = createReaktiveConfig;
