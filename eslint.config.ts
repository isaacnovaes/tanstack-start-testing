import eslintReact from '@eslint-react/eslint-plugin';
import { tanstackConfig } from '@tanstack/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import noSecrets from 'eslint-plugin-no-secrets';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

// The plugin types its preset as one config, an old-format config or a list. It ships one config.
const sonarPreset = sonarjs.configs?.recommended;
const sonarRules = sonarPreset && !Array.isArray(sonarPreset) ? sonarPreset.rules : undefined;

export default defineConfig([
    ...tanstackConfig,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    { plugins: { sonarjs }, rules: { ...sonarRules } },
    { linterOptions: { reportUnusedDisableDirectives: 'error' } },
    ...pluginQuery.configs['flat/recommended'],
    ...pluginRouter.configs['flat/recommended'],
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
            eqeqeq: 'error',
            curly: ['error', 'multi-line'],
            'no-await-in-loop': 'error',
            'no-promise-executor-return': 'error',
            'no-nested-ternary': 'error',
            'max-lines-per-function': [
                'warn',
                { max: 80, skipBlankLines: true, skipComments: true },
            ],
            complexity: ['warn', 15],
            'max-depth': ['warn', 3],
            'no-eval': 'error',
            'no-new-func': 'error',
            'no-script-url': 'error',
            'no-return-assign': 'error',
            'no-sequences': 'error',
            'no-throw-literal': 'error',
            'no-constructor-return': 'error',
            'no-unreachable-loop': 'error',
            'no-alert': 'error',
            radix: 'error',
        },
    },
    {
        rules: {
            '@typescript-eslint/array-type': ['error', { default: 'array' }],
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/strict-void-return': 'error',
            '@typescript-eslint/no-unnecessary-type-conversion': 'error',
            '@typescript-eslint/require-array-sort-compare': 'error',
            'default-param-last': 'off',
            '@typescript-eslint/default-param-last': 'error',
            'no-loop-func': 'off',
            '@typescript-eslint/no-loop-func': 'error',
            'consistent-return': 'off',
            '@typescript-eslint/consistent-return': 'error',
            'max-params': 'off',
            '@typescript-eslint/max-params': ['warn', { max: 3 }],
            '@typescript-eslint/consistent-type-exports': 'warn',
            '@typescript-eslint/no-import-type-side-effects': 'warn',
            '@typescript-eslint/method-signature-style': 'warn',
            '@typescript-eslint/promise-function-async': 'error',
            '@typescript-eslint/no-useless-empty-export': 'warn',
            '@typescript-eslint/no-unsafe-type-assertion': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/strict-boolean-expressions': 'error',
            '@typescript-eslint/prefer-readonly': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
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
            // The typescript-eslint rule checks unused names and allows the _ prefix.
            'sonarjs/no-unused-vars': 'off',
            'sonarjs/unused-import': 'off',
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
    { ...eslintReact.configs['recommended-type-checked'] },
    {
        rules: {
            'react/boolean-prop-naming': ['warn', { validateNested: true }],
            'react/button-has-type': 'warn',
            'react/destructuring-assignment': 'off',
            'react/jsx-boolean-value': 'warn',
            'react/jsx-child-element-spacing': 'warn',
            'react/jsx-handler-names': 'off',
            'react/hook-use-state': 'error',
            // Three plugins check React code. Where two rules report the same code, one is off.
            // @eslint-react/purity also covers new Date() and crypto calls.
            '@eslint-react/purity': 'error',
            'react-hooks/purity': 'off',
            '@eslint-react/dom-no-dangerously-set-innerhtml': 'error',
            '@eslint-react/dom-no-script-url': 'error',
            // react-hooks has the same rules, from the React Compiler.
            '@eslint-react/rules-of-hooks': 'off',
            '@eslint-react/exhaustive-deps': 'off',
            '@eslint-react/set-state-in-effect': 'off',
            '@eslint-react/set-state-in-render': 'off',
            '@eslint-react/static-components': 'off',
            '@eslint-react/use-memo': 'off',
            '@eslint-react/error-boundaries': 'off',
            '@eslint-react/unsupported-syntax': 'off',
            // react/hook-use-state and react/jsx-no-leaked-render (ternary only) cover these.
            '@eslint-react/use-state': 'off',
            '@eslint-react/no-leaked-conditional-rendering': 'off',
            'react/jsx-no-target-blank': 'error',
            'react/iframe-missing-sandbox': 'error',
            'react/jsx-no-constructed-context-values': 'warn',
            'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
            'react/jsx-no-useless-fragment': 'warn',
            'react/jsx-sort-props': [
                'warn',
                {
                    ignoreCase: true,
                    callbacksLast: true,
                    reservedFirst: ['key', 'ref'],
                },
            ],
            'react/no-unused-prop-types': 'warn',
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
        plugins: { 'no-secrets': noSecrets },
        rules: { 'no-secrets/no-secrets': 'error' },
    },
    {
        files: ['*.config.ts'],
        rules: {
            '@typescript-eslint/no-magic-numbers': 'off',
        },
    },
    {
        ignores: ['dist/**', '.netlify/**', 'src/components/ui/**'],
    },
]);
