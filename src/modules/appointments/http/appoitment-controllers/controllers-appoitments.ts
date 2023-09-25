import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateAppointment } from '../../factories/make-create-appointment';
import { UserNotFound } from '../../use-cases/errors/user-not-found';

export class AppointmentController {
  async byPrestador(req: FastifyRequest, res: FastifyReply) {
    try {
      const scheme = z.object({
        prestadorId: z.string(),
      });
      const { prestadorId } = scheme.parse(req.query);

      const make = makeCreateAppointment();

      const rs = await make.byPrestador(prestadorId);

      return res.status(201).send(rs);
    } catch (err) {
      if (err instanceof UserNotFound) {
        return res.status(409).send({ error: err.message });
      }

      throw err;
    }
  }
}
