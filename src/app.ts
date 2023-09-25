/* eslint-disable no-underscore-dangle */
import fastify from 'fastify';
import { ZodError, z } from 'zod';

import { env } from './env';
import { Routes } from './shared/routes/routes';

export const app = fastify();

app.register(Routes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    const key = error.issues[0].path[0];
    const mess = error.issues[0].message;

    return reply
      .status(400)
      .send({ message: `Validation error: ${key}, ${mess}` });
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error);
  }

  return reply.status(500).send({ message: 'Interl server error' });
});
