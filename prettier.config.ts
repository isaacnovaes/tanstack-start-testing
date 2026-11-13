import type { Config } from 'prettier';

const config: Config = {
    tabWidth: 4,
    trailingComma: 'es5',
    singleQuote: true,
    jsxSingleQuote: true,
    printWidth: 100,
    plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
