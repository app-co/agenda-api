import { AppError } from '@/shared/app-error/AppError';
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeServiceCreate } from '../../factories/make-create-service';

export async function listAll(req: FastifyRequest, res: FastifyReply) {
  try {
    const make = makeServiceCreate();

    const rs = await make.listAll();

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(409).send({ message: err.message });
    }

    throw err;
  }
}
