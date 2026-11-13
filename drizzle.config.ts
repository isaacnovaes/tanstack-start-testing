import { defineConfig } from 'drizzle-kit';
import { SERVER_ENV } from './src/server/env';

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: SERVER_ENV.DATABASE_URL,
    },
});
