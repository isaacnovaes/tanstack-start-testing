//  @ts-check

/** @type {import('prettier').Config} */
const config = {
    tabWidth: 4,
    trailingComma: 'es5',
    singleQuote: true,
    jsxSingleQuote: true,
    printWidth: 100,
    plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
