import fs from 'fs';

const fileName = 'package.json';

export const modifyJsonTestScript = (filePath) => {
    const file = require(filePath);

    file.scripts.test = "eslint \"**/*.js\" --ignore-pattern node_modules/";

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
    });
};

export const modifyProjectNameScript = (filePath, projectName) => {
    const file = require(filePath);

    file.name = projectName;

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
        if (err) return console.log(err);
    });
};
