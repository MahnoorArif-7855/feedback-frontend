const path = require('path');

const getProperFileNames = (filenames) => filenames.map((f) => path.relative(process.cwd(), f));

const lintCommand = (filenames) => `next lint --fix --file ${getProperFileNames(filenames).join('--file')}`;
const prettierCommand = (filenames) => `yarn prettier ${getProperFileNames(filenames).join(' ')} --write`;

module.exports = {
  '*.{js,jsx,ts,tsx}': [prettierCommand, lintCommand],
};
