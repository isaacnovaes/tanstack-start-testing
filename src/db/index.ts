import { drizzle } from 'drizzle-orm/node-postgres';

import { SERVER_ENV } from '../../env.ts';
import * as schema from './schema.ts';

export const db = drizzle(SERVER_ENV.DATABASE_URL, { schema });
