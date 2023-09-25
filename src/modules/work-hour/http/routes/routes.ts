import { envRoutes } from '@/env';
import { FastifyInstance } from 'fastify';

import { delet } from '../workhour-controllers/delete';
import { listAll } from '../workhour-controllers/listAll';
import { register } from '../workhour-controllers/register';
import { update } from '../workhour-controllers/update';

export async function RoutesWorkhour(app: FastifyInstance) {
  app.post(envRoutes.CREATE_WORKHOUR, register);
  app.put(envRoutes.UPDATE_WORKHOUR, update);
  app.get(envRoutes.LIST_ALL_WORKHOUR, listAll);
  app.delete(envRoutes.DELETE_WORKHOUR, delet);
}
