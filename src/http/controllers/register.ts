import { UserAlredyExist } from '@/use-cases/errors/user-alredy-existes-error';
import { PrismaUserRepository } from '@/repositories/prisma-users-repository';
import { RegisterUseCase } from '@/use-cases/register';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    nome: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { nome, email, password } = registerScheme.parse(req.body);

  try {
    const usecase = new PrismaUserRepository();
    const create = new RegisterUseCase(usecase);

    const rs = await create.execute({ nome, email, password });
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof UserAlredyExist) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
