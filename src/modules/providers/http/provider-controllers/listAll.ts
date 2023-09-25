import { FastifyReply, FastifyRequest } from 'fastify';

import { makeProvider } from '../../factories/make';
import { ProviderNotFound } from '../../use-cases/errors/provider-not-found';

export async function listAll(req: FastifyRequest, res: FastifyReply) {
  try {
    const create = makeProvider();

    const rs = await create.listAll();

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof ProviderNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
