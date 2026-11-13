import { drizzle } from 'drizzle-orm/node-postgres';
import { SERVER_ENV } from '@/server/env';
import * as schema from '@/db/schema';

export const db = drizzle(SERVER_ENV.DATABASE_URL, { schema });
