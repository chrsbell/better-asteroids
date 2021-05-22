const packageJson = require('./package.json');
const devDependencies = Object.keys(packageJson.devDependencies || {});

module.exports = {
  extends: './node_modules/gts/',
  rules: {
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: devDependencies,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
  },
};
