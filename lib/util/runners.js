const spawn = require('child_process').spawn;

async function runEslintFixScript() {
    return new Promise((resolve) => {
        spawn('npm', ['run', 'eslint:fix']);
        spawn('npm', ['run', 'stylelint:fix']);
        resolve();
    })
}

module.exports = runEslintFixScript;
