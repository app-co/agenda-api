import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { WorkhourRepoPrisma } from '../../repositories/repo-prisma';
import { ServiceNotFound } from '../../use-cases/errors/service-not-found';
import { UseCases } from '../../use-cases/register';

export async function delet(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    id: z.string(),
  });

  const { id } = registerScheme.parse(req.params);

  try {
    const usecase = new WorkhourRepoPrisma();
    const create = new UseCases(usecase, id);

    const rs = await create.delete(id);

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof ServiceNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
