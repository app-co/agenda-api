import { AppError } from '@/shared/app-error/AppError';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeServiceCreate } from '../../factories/make-create-service';

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    name: z.string(),
    fk_provider_id: z.string(),
    amount: z.number(),
    duration: z.number(),
    description: z.string(),
  });

  const data = registerScheme.parse(req.body);

  try {
    const make = makeServiceCreate();

    const rs = await make.create(data);
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(409).send({ message: err.message });
    }

    throw err;
  }
}
