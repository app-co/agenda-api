import { schemeRoutes } from '@/shared/routes/schemeRoutes';
import { FastifyInstance } from 'fastify';

import { VocationController } from '../controller';

const controller = new VocationController();

export async function VovationRoutes(app: FastifyInstance) {
  app.post(schemeRoutes.vocation.create, controller.create);

  app.delete('/vocation-delete/:id', controller.delete);
}
