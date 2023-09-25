import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { RepoPrisma } from '../../repositories/repo-prisma';
import { UserNotFound } from '../../use-cases/errors/user-not-found';
import { ClientUseCase } from '../../use-cases/register';

export async function delet(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    id: z.string(),
  });

  const { id } = registerScheme.parse(req.params);

  try {
    const usecase = new RepoPrisma();
    const create = new ClientUseCase(usecase);

    const rs = await create.delete(id);

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof UserNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
