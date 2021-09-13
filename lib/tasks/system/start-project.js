import execa from 'execa';

async function startProject() {
    const result = execa('npm', ['start']);

    if (!result) {
        return Promise.reject(new Error('Failed to start the project automatically!'));
    }
}

module.exports = startProject;
