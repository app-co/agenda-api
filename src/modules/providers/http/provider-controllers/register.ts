import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeProvider } from '../../factories/make';
import { ProviderRepoPrisma } from '../../repositories/repo-prisma';
import { CnpjAlredyExist } from '../../use-cases/errors/cNPJ-alredy-exist';
import { CpfAlredyExist } from '../../use-cases/errors/cpf-alredy-exist';
import { ProviderExist } from '../../use-cases/errors/provider-exist';
import { ProviderUseCase } from '../../use-cases/register';

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string(),
    avatar: z.string(),
    cell: z.string(),
    cnpj: z.string(),
    cpf: z.string(),
    city: z.string(),
    locality: z.string(),
    home_number: z.string(),
    postal_code: z.string(),
    region_code: z.string(),
    razao_social: z.string(),
  });

  const data = registerScheme.parse(req.body);

  try {
    const make = makeProvider();

    const rs = await make.create(data);
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof ProviderExist) {
      return res.status(409).send({ error: err.message });
    }

    if (err instanceof CpfAlredyExist) {
      return res.status(409).send({ error: err.message });
    }

    if (err instanceof CnpjAlredyExist) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
