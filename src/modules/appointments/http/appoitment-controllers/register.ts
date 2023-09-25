import { AppError } from '@/shared/app-error/AppError';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateAppointment } from '../../factories/make-create-appointment';

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    date: z.string(),
    fk_client_id: z.string().optional(),
    fk_provider_id: z.string(),
    service: z.string(),
    client_name: z.string(),
  });

  const data = registerScheme.parse(req.body);

  try {
    const make = makeCreateAppointment();
    const rs = await make.create(data);
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
