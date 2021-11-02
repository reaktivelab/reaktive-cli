const fs = require('fs');

export const fileExists = (filePath) => fs.existsSync(filePath);

export default fileExists;
