import netlify from '@netlify/vite-plugin-tanstack-start';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact, { reactCompilerPreset } from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: { tsconfigPaths: true },
    plugins: [
        devtools(),
        netlify({ dev: { edgeFunctions: { enabled: false } } }),
        tailwindcss(),
        tanstackStart(),
        viteReact(),
        babel({ presets: [reactCompilerPreset()] }),
    ],
    test: {
        projects: [
            {
                test: {
                    name: 'unit',
                    environment: 'node',
                    include: ['src/**/*.test.ts'],
                },
            },
            {
                test: {
                    name: 'browser',
                    include: ['src/**/*.test.tsx'],
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium' }],
                    },
                },
            },
        ],
    },
});
