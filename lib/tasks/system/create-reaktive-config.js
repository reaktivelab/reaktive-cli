const fs = require('fs').promises;
import { CONFIG_FILE } from '../../util';

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
        "name": nameInit,
        "git": git,
        "eslint": lintInit,
        "manager": manager,
        "template": template.toLowerCase()
    };

    try {
        await fs.writeFile(CONFIG_FILE, JSON.stringify(data, null, 2))
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports = createReaktiveConfig;
