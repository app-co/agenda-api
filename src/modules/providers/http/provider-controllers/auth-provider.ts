import { AppError } from '@/shared/app-error/AppError';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeProvider } from '../../factories/make';

export async function authControllerProvider(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const scheme = z.object({
    email: z.string().email('Inválid email'),
    password: z.string().min(6, 'Mínimo de 6 dígitos'),
  });

  const data = scheme.parse(req.body);
  try {
    const make = makeProvider();
    const rs = await make.session(data);

    return res.status(201).send(rs);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(409).send({ message: err.message });
    }

    throw err;
  }
}
