import dotenv from 'dotenv';
import { z } from 'zod';
import ms from 'ms';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default('1h'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables', parsedEnv.error.format());
  process.exit(1);
}

export const env = {
  port: parsedEnv.data.PORT,
  dbHost: parsedEnv.data.DB_HOST,
  dbUser: parsedEnv.data.DB_USER,
  dbPassword: parsedEnv.data.DB_PASSWORD,
  dbName: parsedEnv.data.DB_NAME,
  jwtSecret: parsedEnv.data.JWT_SECRET,
  jwtExpiration: parsedEnv.data.JWT_EXPIRATION as ms.StringValue,
};
