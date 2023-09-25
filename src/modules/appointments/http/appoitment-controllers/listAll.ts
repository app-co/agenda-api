import { FastifyReply, FastifyRequest } from 'fastify';

import { makeCreateAppointment } from '../../factories/make-create-appointment';
import { UserNotFound } from '../../use-cases/errors/user-not-found';

export async function listAll(req: FastifyRequest, res: FastifyReply) {
  try {
    const make = makeCreateAppointment();

    const rs = await make.listAll();

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof UserNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
