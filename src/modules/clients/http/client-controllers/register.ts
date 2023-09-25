import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaClient } from '../../repositories/repo-prisma';
import { UserAlredyExist } from '../../use-cases/errors/user-alredy-existes-error';
import { ClientUseCase } from '../../use-cases/register';

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    cell: z.string().min(11),
  });

  const { name, email, password, cell } = registerScheme.parse(req.body);

  try {
    const usecase = new PrismaClient();
    const create = new ClientUseCase(usecase);

    const rs = await create.create({ name, cell, email, password });
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof UserAlredyExist) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
