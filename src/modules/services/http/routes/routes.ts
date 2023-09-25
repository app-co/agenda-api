import { envRoutes } from '@/env';
import { FastifyInstance } from 'fastify';

import { delet } from '../service-controllers/delete';
import { listAll } from '../service-controllers/listAll';
import { register } from '../service-controllers/register';
import { update } from '../service-controllers/update';

export async function RoutesServices(app: FastifyInstance) {
  app.post(envRoutes.CREATE_SERVICE, register);
  app.put(envRoutes.UPDATE_SERVICE, update);
  app.get(envRoutes.LIST_ALL_SERVICE, listAll);
  app.delete(envRoutes.DELETE_SERVICE, delet);
}
