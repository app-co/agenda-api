import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaClient } from '../../repositories/repo-prisma';
import { AuthenticateUseCase } from '../../use-cases/authenticate';
import { InvalidCredentials } from '../../use-cases/errors/invalide-auth-credentials';

export async function session(req: FastifyRequest, res: FastifyReply) {
  const scheme = z.object({
    email: z.string(),
    password: z.string(),
  });

  const data = scheme.parse(req.body);
  try {
    const usecase = new PrismaClient();
    const create = new AuthenticateUseCase(usecase);

    const rs = await create.execute(data);

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof InvalidCredentials) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
