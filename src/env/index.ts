/* eslint-disable no-underscore-dangle */
import 'dotenv/config';

import { z } from 'zod';

const envSche = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
});

const _env = envSche.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment', _env.error.format());
  throw new Error('Invalid environment');
}

export const env = _env.data;
