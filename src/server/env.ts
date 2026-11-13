import { z } from 'zod';

const SERVER_ENV_SCHEMA = z.object({
    DATABASE_URL: z.string().nonempty(),
});

export const SERVER_ENV = SERVER_ENV_SCHEMA.parse(process.env);
