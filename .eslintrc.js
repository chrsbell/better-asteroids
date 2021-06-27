const packageJson = require('./package.json');
const devDependencies = Object.keys(packageJson.devDependencies || {});

module.exports = {
  extends: './node_modules/gts/',
  rules: {
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {accessibility: 'no-public', overrides: {properties: 'explicit'}},
    ],
    '@typescript-eslint/explicit-function-return-type': ['error'],
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
