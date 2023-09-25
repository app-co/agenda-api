import { ProviderRepoPrisma } from '@/modules/providers/repositories/repo-prisma';
import { ProviderNotFound } from '@/modules/providers/use-cases/errors/provider-not-found';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeRegisterWorkhour } from '../../factories/make-register';
import { WorkhourRepoPrisma } from '../../repositories/repo-prisma';
import { UseCases } from '../../use-cases/register';

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    from: z.number(),
    at: z.number(),
    week: z.number().array(),
    fk_provider_id: z.string(),
  });

  const data = registerScheme.parse(req.body);

  try {
    const make = makeRegisterWorkhour();

    const rs = await make.create(data);
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof ProviderNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
