module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'winniepukki-guardian'
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'winniepukki-guidelines'
    ],
    rules: {
        'winniepukki-guidelines/derived-class-names': ['error'],
        'winniepukki-guidelines/file-structure': ['error'],
        'winniepukki-guidelines/use-license': ["error", {
            "author": "reaktive-cli",
            "description": "This project was bootstrapped with Reaktive-cli",
            "license": "MIT"
        }],
    }
};