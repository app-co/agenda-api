import { envRoutes } from '@/env';
import { FastifyInstance } from 'fastify';

import { delet } from '../client-controllers/delete';
import { listAll } from '../client-controllers/listAll';
import { register } from '../client-controllers/register';
import { session } from '../client-controllers/session';
import { update } from '../client-controllers/update';

export async function RoutesClient(app: FastifyInstance) {
  app.post(envRoutes.CREATE_CLIENT, register);
  app.put(envRoutes.UPDATE_CLIENT, update);
  app.get(envRoutes.LIST_ALL_CLIET, listAll);
  app.delete(envRoutes.DELETE_CLIENT, delet);
  app.post(envRoutes.SESSION_CLIENT, session);
}
