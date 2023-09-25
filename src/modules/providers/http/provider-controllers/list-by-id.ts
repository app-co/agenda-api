import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeProvider } from '../../factories/make';
import { ProviderNotFound } from '../../use-cases/errors/provider-not-found';

export async function listById(req: FastifyRequest, res: FastifyReply) {
  const scheme = z.object({
    id: z.string(),
  });

  const { id } = scheme.parse(req.params);
  try {
    const make = makeProvider();

    const rs = await make.listById(id);

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof ProviderNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
