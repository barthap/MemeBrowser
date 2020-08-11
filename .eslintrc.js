/*module.exports = {
    root: true,
    parserOptions: {
        project: "./tsconfig.json",
    },
    extends: ['airbnb-typescript', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
    rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react/destructuring-assignment': 'off',
        'react/require-default-props': 'warn',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': ['warn', {
            'skipUndeclared': true
        }],
        'import/prefer-default-export': 'warn',
        'no-param-reassign': 'off',
        'func-names': 'off',
        'no-console': 'off' //TODO: check whenever in debug mode or not
    },
    ignorePatterns: ["**\/__tests__/*.js"] 
};
*/
module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['jest'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:jest/recommended',
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': [
      'warn',
      {
        skipUndeclared: true,
      },
    ],
    'react/display-name': 'off',
  },
  env: {
    'jest/globals': true,
  },
};
