import { AppError } from '@/shared/app-error/AppError';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeAvaliable } from '../../factories/make-avaliable';

export async function appointmentAvaliableController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const scheme = z.object({
    providerId: z.string(),
    day: z.string(),
    month: z.string(),
    service: z.string(),
  });
  try {
    const data = scheme.parse(req.query);

    const make = makeAvaliable();
    const rs = await make.execute(data);
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
