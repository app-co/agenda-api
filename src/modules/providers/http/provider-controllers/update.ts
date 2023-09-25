import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ProviderRepoPrisma } from '../../repositories/repo-prisma';
import { CnpjAlredyExist } from '../../use-cases/errors/cNPJ-alredy-exist';
import { CpfAlredyExist } from '../../use-cases/errors/cpf-alredy-exist';
import { ProviderExist } from '../../use-cases/errors/provider-exist';
import { ProviderNotFound } from '../../use-cases/errors/provider-not-found';
import { ProviderUseCase } from '../../use-cases/register';

export async function update(req: FastifyRequest, res: FastifyReply) {
  const registerScheme = z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    email: z.string().optional(),
    avatar: z.string().optional(),
    cell: z.string().optional(),
    cnpj: z.string().optional(),
    cpf: z.string().optional(),
    city: z.string().optional(),
    locality: z.string().optional(),
    home_number: z.string().optional(),
    postal_code: z.string().optional(),
    region_code: z.string().optional(),
    razao_social: z.string().optional(),
  });

  const data = registerScheme.parse(req.body);

  const idparams = z.object({
    id: z.string(),
  });

  const { id } = idparams.parse(req.params);

  const dt = {
    ...data,
    id,
  };

  try {
    const usecase = new ProviderRepoPrisma();
    const create = new ProviderUseCase(usecase);

    const rs = await create.update(dt);
    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof ProviderNotFound) {
      return res.status(409).send({ error: err.message });
    }

    if (err instanceof CpfAlredyExist) {
      return res.status(409).send({ error: err.message });
    }

    if (err instanceof CnpjAlredyExist) {
      return res.status(409).send({ error: err.message });
    }

    if (err instanceof ProviderExist) {
      return res.status(409).send({ error: err.message });
    }

    throw err;
  }
}
