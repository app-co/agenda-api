import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaClient } from '../../repositories/repo-prisma';
import { UserNotFound } from '../../use-cases/errors/user-not-found';
import { ClientUseCase } from '../../use-cases/register';

export async function listAll(req: FastifyRequest, res: FastifyReply) {
  try {
    const usecase = new PrismaClient();
    const create = new ClientUseCase(usecase);

    const rs = await create.listAll();

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof UserNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
