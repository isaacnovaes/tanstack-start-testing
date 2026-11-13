import { defineConfig } from 'oxfmt';

export default defineConfig({
    tabWidth: 4,
    trailingComma: 'es5',
    singleQuote: true,
    jsxSingleQuote: true,
    printWidth: 100,
    sortTailwindcss: true,
    ignorePatterns: ['src/routeTree.gen.ts'],
});
