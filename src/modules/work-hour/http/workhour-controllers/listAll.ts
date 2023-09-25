import { FastifyReply, FastifyRequest } from 'fastify';

import { WorkhourRepoPrisma } from '../../repositories/repo-prisma';
import { ServiceNotFound } from '../../use-cases/errors/service-not-found';
import { UseCases } from '../../use-cases/register';

export async function listAll(req: FastifyRequest, res: FastifyReply) {
  try {
    const usecase = new WorkhourRepoPrisma();
    const create = new UseCases(usecase);

    const rs = await create.listAll();

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof ServiceNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
