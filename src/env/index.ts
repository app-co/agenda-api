/* eslint-disable no-underscore-dangle */
import 'dotenv/config';

import { z } from 'zod';

import { routesScheme } from './Scheme-routes';

const envSche = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
});

const _env = envSche.safeParse(process.env);
const _clients_routes = routesScheme.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment', _env.error.format());
  throw new Error('Invalid environment');
}

if (_clients_routes.success === false) {
  console.error('Invalid environment', _clients_routes.error.format());
  throw new Error('Invalid environment');
}

export const env = _env.data;

export const envRoutes = _clients_routes.data;
