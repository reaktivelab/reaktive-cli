const { spawn } = require('child_process');

async function runLintingScripts() {
  return new Promise((resolve) => {
    spawn('npm', ['run', 'eslint:fix']);
    spawn('npm', ['run', 'stylelint:fix']);
    resolve();
  });
}

module.exports = runLintingScripts;
