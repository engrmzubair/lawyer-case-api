import dotenv from 'dotenv';
import { z } from 'zod';
import ms from 'ms';

dotenv.config();

const envSchema = z.object({
  PORT:  z.coerce.number().default(5000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default('1h'),
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(10)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables', parsedEnv.error.format());
  process.exit(1);
}

export const env = {
  port: parsedEnv.data.PORT,
  dbUrl: parsedEnv.data.DATABASE_URL,
  jwtSecret: parsedEnv.data.JWT_SECRET,
  jwtExpiration: parsedEnv.data.JWT_EXPIRATION as ms.StringValue,
  bcryptSaltRounds: parsedEnv.data.BCRYPT_SALT_ROUNDS
};
