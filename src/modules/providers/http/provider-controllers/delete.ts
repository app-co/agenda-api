import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeProvider } from '../../factories/make';
import { ProviderNotFound } from '../../use-cases/errors/provider-not-found';

export async function delet(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    id: z.string(),
  });

  const { id } = registerScheme.parse(req.params);

  try {
    const make = makeProvider();

    const rs = await make.delete(id);

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof ProviderNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
