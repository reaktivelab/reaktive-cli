import execa from 'execa';
import chalk from 'chalk';

async function startProject(packageManager = 'npm') {
  const result = await execa(packageManager, ['start']).stdout.pipe(process.stdout);

  if (result.failed) {
    console.log('%s Unable to start the project!', chalk.red.bold('ERROR'));
  }
}

module.exports = startProject;
