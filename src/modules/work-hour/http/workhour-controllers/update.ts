import { UserNotFound } from '@/modules/clients/use-cases/errors/user-not-found';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { WorkhourRepoPrisma } from '../../repositories/repo-prisma';
import { UseCases } from '../../use-cases/register';

export async function update(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    from: z.number().optional(),
    at: z.number().optional(),
    weekend: z.string().array().optional(),
  });

  const data = registerScheme.parse(req.body);

  const idparams = z.object({
    id: z.string(),
  });

  const { id } = idparams.parse(req.params);

  const dt = {
    ...data,
    id,
  };

  try {
    const usecase = new WorkhourRepoPrisma();
    const create = new UseCases(usecase);

    const rs = await create.update(dt);
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof UserNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
