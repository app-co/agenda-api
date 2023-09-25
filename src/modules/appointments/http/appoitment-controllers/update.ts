import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { RepoPrisma } from '../../repositories/repo-prisma';
import { UserNotFound } from '../../use-cases/errors/user-not-found';
import { ClientUseCase } from '../../use-cases/register';

export async function update(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    cell: z.string().min(11).optional(),
    avatar: z.string(),
  });

  const { name, email, password, cell, avatar } = registerScheme.parse(
    req.body,
  );

  const idparams = z.object({
    id: z.string(),
  });

  const { id } = idparams.parse(req.params);

  try {
    const usecase = new RepoPrisma();
    const create = new ClientUseCase(usecase);

    const rs = await create.update({ name, cell, email, password, avatar, id });
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof UserNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
