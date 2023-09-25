import { UserNotFound } from '@/modules/clients/use-cases/errors/user-not-found';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { RepoPrisma } from '../../repositories/repo-prisma';
import { ServiceUseCase } from '../../use-cases/register';

export async function update(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    amount: z.number().optional(),
    duration: z.number().optional(),
  });

  const { name, amount, duration, image } = registerScheme.parse(req.body);

  const idparams = z.object({
    id: z.string(),
  });

  const { id } = idparams.parse(req.params);

  try {
    const usecase = new RepoPrisma();
    const create = new ServiceUseCase(usecase);

    const rs = await create.update({ name, image, amount, duration, id });
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof UserNotFound) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
