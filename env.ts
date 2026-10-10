import z from 'zod';

const ENV_SCHEMA = z.object({
    SERVER: z.object({
        DATABASE_URL: z.string().nonempty(),
    }),
});

export const SERVER_ENV = ENV_SCHEMA.shape.SERVER.parse(process.env);
