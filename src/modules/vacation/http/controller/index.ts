import { AppError } from '@/shared/app-error/AppError';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeVocation } from '../../factories/make-vocation';

export class VocationController {
  async create(req: FastifyRequest, res: FastifyReply) {
    const registerScheme = z.object({
      prestadorId: z.string(),
      weekend: z.any().array(),
      start: z.string(),
      end: z.string(),
      type: z.enum(['SEMANAL', 'DIARIA', 'MENSAL']).default('DIARIA'),
    });

    const data = registerScheme.parse(req.body);

    try {
      const make = makeVocation();

      const rs = await make.register(data);
      return res.status(201).send(rs);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(409).send({ error: err.message });
      }

      throw err;
    }
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    const registerScheme = z.object({
      id: z.string(),
    });

    const { id } = registerScheme.parse(req.params);

    try {
      const make = makeVocation();

      const rs = await make.delete(id);
      return res.status(201).send(rs);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(409).send({ error: err.message });
      }

      throw err;
    }
  }
}
