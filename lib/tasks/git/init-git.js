import execa from 'execa';

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  });

  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git!'));
  }

  return true;
}

module.exports = initGit;
