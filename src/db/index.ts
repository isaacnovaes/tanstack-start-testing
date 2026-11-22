import { drizzle } from 'drizzle-orm/node-postgres';
import { SERVER_ENV } from '#/server/env.ts';
import * as schema from '#/db/schema.ts';

export const db = drizzle(SERVER_ENV.DATABASE_URL, { schema });
