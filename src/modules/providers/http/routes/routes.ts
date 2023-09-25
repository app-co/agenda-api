import { envRoutes } from '@/env';
import { FastifyInstance } from 'fastify';

import { authControllerProvider } from '../provider-controllers/auth-provider';
import { delet } from '../provider-controllers/delete';
import { listById } from '../provider-controllers/list-by-id';
import { listAll } from '../provider-controllers/listAll';
import { register } from '../provider-controllers/register';
import { update } from '../provider-controllers/update';

export async function RoutesProvider(app: FastifyInstance) {
  app.post(envRoutes.CREATE_PROVIDER, register);
  app.put(envRoutes.UPDATE_PROVIDER, update);
  app.get(envRoutes.LIST_ALL_PROVIDER, listAll);
  app.get(envRoutes.LIST_PROVIDER_BY_ID, listById);
  app.delete(envRoutes.DELETE_PROVIDER, delet);

  app.post('/provider-session', authControllerProvider);
}
