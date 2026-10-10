import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema.ts'
import { SERVER_ENV } from '../../env.ts'

export const db = drizzle(SERVER_ENV.DATABASE_URL, { schema })
