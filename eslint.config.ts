import { tanstackConfig } from '@tanstack/eslint-config';
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const RENDER_SCOPES = [
    'FunctionDeclaration[id.name=/^([A-Z]|use[A-Z])/]',
    'FunctionExpression[id.name=/^([A-Z]|use[A-Z])/]',
    'VariableDeclarator[id.name=/^([A-Z]|use[A-Z])/] > ArrowFunctionExpression',
    'VariableDeclarator[id.name=/^([A-Z]|use[A-Z])/] > FunctionExpression',
];

// react-hooks/purity knows only Date.now, Math.random and performance.now.
const IMPURE_IN_RENDER = [
    "NewExpression[callee.name='Date'][arguments.length=0]",
    "CallExpression[callee.object.name='crypto'][callee.property.name=/^(randomUUID|getRandomValues)$/]",
];

const impureRenderSelectors = RENDER_SCOPES.flatMap((scope) =>
    IMPURE_IN_RENDER.map((impure) => ({
        selector: `${scope} ${impure}:not(${scope} :function ${impure})`,
        message:
            'Impure value during render. Read it in an effect, an event handler or a loader, or pass it in as a prop.',
    }))
);

export default defineConfig([
    ...tanstackConfig,
    {
        rules: {
            'array-callback-return': 'warn',
            'no-duplicate-imports': ['warn', { allowSeparateTypeImports: true }],
            'no-self-compare': 'error',
            'no-template-curly-in-string': 'error',
            'no-useless-assignment': 'error',
            'require-atomic-updates': 'warn',
            'default-case': 'warn',
            'default-case-last': 'warn',
            'guard-for-in': 'error',
            'no-console': ['warn', { allow: ['error'] }],
            'no-lone-blocks': 'error',
            'no-param-reassign': 'error',
            'no-else-return': ['error', { allowElseIf: false }],
            'no-extra-boolean-cast': ['error', { enforceForInnerExpressions: true }],
            'no-implicit-coercion': 'error',
            'no-lonely-if': 'error',
            'no-unneeded-ternary': ['error', { defaultAssignment: false }],
            'no-useless-computed-key': 'warn',
            'no-useless-return': 'error',
            'no-var': 'error',
            'object-shorthand': 'warn',
            'prefer-const': 'error',
            'prefer-object-has-own': 'error',
            'prefer-template': 'error',
            yoda: 'error',
            camelcase: 'error',
        },
    },
    {
        rules: {
            '@typescript-eslint/consistent-type-exports': 'warn',
            '@typescript-eslint/no-import-type-side-effects': 'warn',
            '@typescript-eslint/method-signature-style': 'warn',
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/no-useless-empty-export': 'warn',
            '@typescript-eslint/no-unsafe-type-assertion': 'error',
            'require-await': 'off',
            '@typescript-eslint/require-await': 'error',
            'no-empty-function': 'off',
            '@typescript-eslint/no-empty-function': 'error',
            'prefer-destructuring': 'off',
            '@typescript-eslint/prefer-destructuring': 'error',
            'no-magic-numbers': 'off',
            '@typescript-eslint/no-magic-numbers': [
                'warn',
                {
                    ignore: [0, 1],
                    enforceConst: true,
                    detectObjects: true,
                    ignoreEnums: true,
                    ignoreNumericLiteralTypes: true,
                },
            ],
            'no-redeclare': 'off',
            '@typescript-eslint/no-redeclare': ['error'],
            'no-shadow': 'off',
            '@typescript-eslint/no-shadow': ['warn', { hoist: 'all' }],
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'error',
            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': ['warn', { functions: false }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    {
        ...reactPlugin.configs.flat['jsx-runtime'],
        // Not 'detect': that path in eslint-plugin-react calls an API that ESLint 10 removed.
        settings: { react: { version: '19' } },
    },
    reactHooks.configs.flat['recommended-latest'],
    jsxA11y.flatConfigs.strict,
    {
        rules: {
            'react/boolean-prop-naming': ['warn', { validateNested: true }],
            'react/button-has-type': 'warn',
            'react/destructuring-assignment': 'off',
            'react/jsx-boolean-value': 'warn',
            'react/jsx-child-element-spacing': 'warn',
            'react/jsx-handler-names': 'off',
            'react/jsx-no-constructed-context-values': 'warn',
            'react/jsx-no-leaked-render': ['warn', { validStrategies: ['ternary', 'coerce'] }],
            'react/jsx-no-useless-fragment': 'warn',
            'react/jsx-sort-props': [
                'warn',
                {
                    ignoreCase: true,
                    callbacksLast: true,
                    reservedFirst: ['key', 'ref'],
                },
            ],
            'react/no-array-index-key': 'warn',
            'react/no-unstable-nested-components': 'error',
            'react/no-unused-prop-types': 'warn',
            'react/prefer-read-only-props': 'warn',
            'react/self-closing-comp': 'warn',
            'react/style-prop-object': 'warn',
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'function',
                    format: ['PascalCase', 'camelCase'],
                },
            ],
        },
    },
    {
        rules: {
            'no-restricted-syntax': ['error', ...impureRenderSelectors],
        },
    },
    {
        rules: {
            'no-restricted-globals': [
                'error',
                {
                    name: 'Temporal',
                    message:
                        'Temporal is server only. Use it in src/db or src/server and call that code from here.',
                },
            ],
        },
    },
    {
        files: ['src/db/**', 'src/server/**'],
        rules: {
            'no-restricted-globals': 'off',
        },
    },
    {
        files: ['*.config.ts'],
        rules: {
            '@typescript-eslint/no-magic-numbers': 'off',
        },
    },
    {
        ignores: ['dist/**', '.netlify/**'],
    },
]);
