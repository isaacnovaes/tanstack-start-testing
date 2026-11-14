# TanStack Start bootstrap

This repository is a starting point for a new web application. It contains TanStack Start with React, a Postgres connection through Drizzle, and the tools that make sure that the code is correct. The application has one page and no demo content.

## Requirements

You need Node 26 and pnpm 12.18.0. The file `.nvmrc` selects the Node version, and the field `packageManager` in `package.json` selects the pnpm version. If pnpm is not installed on your computer, put `npx` before each command, for example `npx pnpm install`.

## Setup

Do these steps in the root folder of the repository.

1. Run `nvm use` to select Node 26.
2. Run `pnpm install` to install the packages.
3. Run `pnpm exec playwright install chromium` to download the browser for the tests.
4. Copy `.env.example` to `.env` and set `DATABASE_URL` to the address of a Postgres database.
5. Run `pnpm dev` and open `http://localhost:3000`.

## Scripts

| Command            | Purpose                                                      |
| ------------------ | ------------------------------------------------------------ |
| `pnpm dev`         | Starts the development server on port 3000.                  |
| `pnpm build`       | Builds the application for production.                       |
| `pnpm preview`     | Serves the production build on your computer.                |
| `pnpm typecheck`   | Runs the TypeScript compiler without output files.           |
| `pnpm lint`        | Runs ESLint.                                                 |
| `pnpm lint:fix`    | Runs ESLint and applies the automatic fixes.                 |
| `pnpm check`       | Makes sure that oxfmt formatted every file.                  |
| `pnpm format`      | Formats the files with oxfmt.                                |
| `pnpm test`        | Runs all tests one time.                                     |
| `pnpm test:watch`  | Runs the tests again after each change to a file.            |
| `pnpm db:generate` | Writes a migration file from `src/db/schema.ts`.             |
| `pnpm db:migrate`  | Applies the migration files to the database.                 |
| `pnpm db:push`     | Applies the schema to the database without a migration file. |
| `pnpm db:studio`   | Opens Drizzle Studio, a browser tool that shows the data.    |

Before you commit, run `pnpm typecheck`, `pnpm lint`, `pnpm check`, and `pnpm test`. Each command must exit with code 0.

## Folder structure

| Path                   | Content                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- |
| `src/routes`           | The pages. Each file is one route. `__root.tsx` is the layout for all pages. |
| `src/components`       | The React components.                                                        |
| `src/lib`              | Code that the browser and the server can both use.                           |
| `src/server`           | Code that runs on the server only, for example `env.ts`.                     |
| `src/db`               | The Drizzle schema and the database connection.                              |
| `src/routeTree.gen.ts` | A file that TanStack Router generates. Do not edit it.                       |

Import every file in `src` through the alias `@/`, for example `import { cn } from '@/lib/utils'`. The alias points to the `src` folder.

## Routes

TanStack Router makes a route from each file in `src/routes`. The development server and the build update `src/routeTree.gen.ts` when you add or remove a route file. If you put a test file in `src/routes`, start its name with `-`. The router then ignores the file.

## Tests

Vitest runs two groups of tests. Files that end with `.test.ts` run in Node. Files that end with `.test.tsx` run in Chromium through Playwright, so a component test uses a real browser. Use the package `vitest-browser-react` to render a component in a test. The file `src/components/ThemeToggle.test.tsx` is an example.

## Color scheme

The page follows the color scheme of the operating system. This works without JavaScript, because the color tokens in `src/styles.css` use the CSS function `light-dark()`. The button in the header lets the user select light, dark, or automatic. The selection is stored in `localStorage`, and the class `light` or `dark` on the `html` element applies it.

## Rules that ESLint enforces

The configuration in `eslint.config.ts` adds these sets of rules to the TanStack configuration:

- The `strictTypeChecked` and `stylisticTypeChecked` presets of typescript-eslint. They use type information. For example, they report a promise that no code handles.
- `eslint-plugin-sonarjs`, for code that is probably a bug.
- `eslint-plugin-no-secrets`, for strings that look like a key or a token.
- Three plugins for React code. `eslint-plugin-react-hooks` has the rules of the React Compiler. `@eslint-react` has correctness rules. `eslint-plugin-react` has style rules. Where two plugins have the same rule, one of the two is off.

These rules are the ones that you see most frequently:

- `Temporal` is permitted only in `src/server` and `src/db`. Not all browsers support `Temporal`.
- A value that changes between renders is not permitted in the body of a component or a hook. Examples are `new Date()` without arguments, `Date.now()`, `Math.random()`, and `crypto.randomUUID()`. Read such a value in an effect, in an event handler, or in a loader.
- A condition must be a boolean. Write `text !== undefined`, not `text`.
- Write `condition ? <Item /> : null` in JSX, not `condition && <Item />`.
- Write `Item[]`, not `Array<Item>`.
- A function with more than 80 lines causes a warning.

ESLint does not examine `src/components/ui`, because the shadcn tool generates the files in that directory.

## Database

`src/server/env.ts` reads `DATABASE_URL` and stops the server if the variable is missing. `src/db/schema.ts` contains one example table, `todos`. Replace it with the tables of your application, then run `pnpm db:generate` and `pnpm db:migrate`.

## UI components

The repository is prepared for shadcn/ui. To add a component, run this command:

```bash
pnpm dlx shadcn@latest add button
```

The command writes the component to `src/components/ui`. The packages that these components import are already installed.

## Deployment to Netlify

The file `netlify.toml` contains the build configuration for Netlify.

1. Push the repository to GitHub.
2. Open `https://app.netlify.com/start` and import the repository.
3. In the Netlify project, add the environment variable `DATABASE_URL`.
4. Start the first deploy.

Netlify runs server code in Netlify Functions. Make sure that the functions use Node 26 before you use `Temporal` in server code. To do this, log `process.version` in a server function after the first deploy. If the log shows a version lower than 26, do not use `Temporal` on the server.

## Updates of pnpm

The pnpm version is written in two places in `package.json`: the field `packageManager` and the entry `pnpm` in `devDependencies`. Change both to the same version. If pnpm is installed on your computer, update that installation to the same version too.
