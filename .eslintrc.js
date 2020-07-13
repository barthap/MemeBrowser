module.exports = {
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
    ignorePatterns: ["**/__tests__/*.js"] 
};